'use client';

import { useState, useRef, MouseEvent } from 'react';
import Header from "@/components/header";
import ImageCanvas from "@/components/image-canvas";
import PromptInput from "@/components/prompt-input";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePromptSubmit = async (prompt: string) => {
    if (!image) return;

    setLoading(true);

    try {
      const response = await fetch('/api/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image, prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to edit image');
      }

      const data = await response.json();
      setImage(data.image);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!mainContainerRef.current) return;
    const { clientX, clientY, currentTarget } = e;
    const { offsetWidth, offsetHeight } = currentTarget;
    const x = (clientX - offsetWidth / 2) / (offsetWidth / 2);
    const y = (clientY - offsetHeight / 2) / (offsetHeight / 2);
    mainContainerRef.current.style.setProperty('--x', `${-x * 5}deg`);
    mainContainerRef.current.style.setProperty('--y', `${y * 5}deg`);
  };


  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-transparent text-white p-4 [perspective:800px]"
      onMouseMove={handleMouseMove}
    >
      <div
        ref={mainContainerRef}
        className="w-full max-w-7xl mx-auto transition-transform duration-500 ease-out [transform-style:preserve-3d]"
        style={{ transform: 'rotateY(var(--x, 0)) rotateX(var(--y, 0))' }}
      >
        <Header onUploadClick={handleUploadClick} />
        <main className="flex flex-col items-center mt-4 space-y-4">
          <ImageCanvas image={image} fileInputRef={fileInputRef} handleFileChange={handleFileChange} loading={loading} />
          <PromptInput onSubmit={handlePromptSubmit} />
        </main>
      </div>
    </div>
  );
}