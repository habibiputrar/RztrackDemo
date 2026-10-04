/* eslint-disable @next/next/no-img-element */
"use client";

import { Minus, Plus, RotateCcw, X } from "lucide-react";
import { PointerEvent, useRef, useState } from "react";

const VIEWPORT = 280;
const OUTPUT = 512;

export function AvatarCropper({ imageUrl, onCancel, onSave }: { imageUrl: string; onCancel: () => void; onSave: (blob: Blob) => Promise<void> }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const dragRef = useRef<{ x: number; y: number; originX: number; originY: number } | null>(null);
  const [size, setSize] = useState({ width: 1, height: 1 });
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState("");

  const baseScale = Math.max(VIEWPORT / size.width, VIEWPORT / size.height);
  const clampOffset = (x: number, y: number, nextZoom = zoom) => {
    const maxX = Math.max(0, (size.width * baseScale * nextZoom - VIEWPORT) / 2);
    const maxY = Math.max(0, (size.height * baseScale * nextZoom - VIEWPORT) / 2);
    return { x: Math.max(-maxX, Math.min(maxX, x)), y: Math.max(-maxY, Math.min(maxY, y)) };
  };
  const setNextZoom = (value: number) => {
    const next = Math.max(1, Math.min(3, value));
    setZoom(next);
    setOffset((current) => clampOffset(current.x, current.y, next));
  };
  const pointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, y: event.clientY, originX: offset.x, originY: offset.y };
  };
  const pointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    setOffset(clampOffset(dragRef.current.originX + event.clientX - dragRef.current.x, dragRef.current.originY + event.clientY - dragRef.current.y));
  };
  const apply = async () => {
    const image = imageRef.current;
    if (!image || !image.complete || !image.naturalWidth || !image.naturalHeight) {
      setLoadError("Foto belum selesai dimuat. Pilih ulang foto lalu coba kembali.");
      return;
    }
    setSaving(true);
    const canvas = document.createElement("canvas");
    canvas.width = OUTPUT;
    canvas.height = OUTPUT;
    const context = canvas.getContext("2d");
    if (!context) { setSaving(false); return; }
    const ratio = OUTPUT / VIEWPORT;
    const drawScale = baseScale * zoom * ratio;
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, OUTPUT, OUTPUT);
    context.translate(OUTPUT / 2 + offset.x * ratio, OUTPUT / 2 + offset.y * ratio);
    context.drawImage(image, -image.naturalWidth * drawScale / 2, -image.naturalHeight * drawScale / 2, image.naturalWidth * drawScale, image.naturalHeight * drawScale);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", .9));
    if (blob) await onSave(blob);
    setSaving(false);
  };

  return <div className="modal-backdrop avatar-crop-backdrop">
    <section className="avatar-crop-modal" role="dialog" aria-modal="true" aria-label="Sesuaikan foto profil">
      <header><div><h2>Sesuaikan foto</h2><p>Geser foto dan atur zoom hingga posisinya sesuai.</p></div><button className="icon-button" onClick={onCancel} aria-label="Tutup"><X /></button></header>
      <div className="avatar-crop-body">
        <div className="avatar-crop-viewport" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={() => { dragRef.current = null; }} onPointerCancel={() => { dragRef.current = null; }}>
          {imageUrl && <img ref={imageRef} src={imageUrl} alt="Pratinjau foto profil" draggable={false} onLoad={(event) => { setSize({ width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight }); setLoadError(""); }} onError={() => setLoadError("Foto tidak dapat dimuat. Gunakan file JPG, PNG, atau WebP lain.")} style={{ width: size.width * baseScale, height: size.height * baseScale, transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px) scale(${zoom})` }} />}
          <span className="avatar-crop-mask" />
        </div>
        {loadError && <p className="avatar-crop-error">{loadError}</p>}
        <div className="avatar-zoom-control"><button className="icon-button" onClick={() => setNextZoom(zoom - .15)} aria-label="Perkecil"><Minus size={18} /></button><input type="range" min="1" max="3" step="0.05" value={zoom} onChange={(event) => setNextZoom(Number(event.target.value))} aria-label="Zoom foto"/><button className="icon-button" onClick={() => setNextZoom(zoom + .15)} aria-label="Perbesar"><Plus size={18} /></button></div>
        <button className="avatar-reset" onClick={() => { setZoom(1); setOffset({ x: 0, y: 0 }); }}><RotateCcw size={15} />Atur ulang</button>
      </div>
      <footer><button className="button secondary" onClick={onCancel}>Batal</button><button className="button primary" onClick={() => void apply()} disabled={saving || Boolean(loadError) || !imageUrl}>{saving ? "Menyimpan..." : "Gunakan foto"}</button></footer>
    </section>
  </div>;
}
