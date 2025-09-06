'use client';

import { useState, useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import Header from "@/components/header";
import ImageCanvas from "@/components/image-canvas";
import PromptInput from "@/components/prompt-input";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const { clientX, clientY } = e;
    document.documentElement.style.setProperty('--x', `${clientX}px`);
    document.documentElement.style.setProperty('--y', `${clientY}px`);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-transparent text-white p-4 overflow-hidden"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="w-full max-w-7xl mx-auto"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Header onUploadClick={handleUploadClick} />
      </motion.div>

      <main className="flex flex-col items-center mt-4 space-y-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
        >
          <ImageCanvas image={image} fileInputRef={fileInputRef} handleFileChange={handleFileChange} loading={loading} />
        </motion.div>
        <motion.div
          className="w-full"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <PromptInput onSubmit={handlePromptSubmit} />
        </motion.div>
      </main>
    </motion.div>
  );
}