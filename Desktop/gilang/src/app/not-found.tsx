'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Home, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-mitsu-black via-mitsu-black to-mitsu-red/10 flex flex-col mt-16">
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl w-full text-center"
          >
            {/* Big 404 Number */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-mitsu-red to-mitsu-red/50 blur-3xl opacity-30 rounded-full" />
                <h1 className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-mitsu-red to-white relative z-10">
                  404
                </h1>
              </div>
            </motion.div>

            {/* Main Message */}
            <motion.div variants={itemVariants} className="mb-6">
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
                Oops! Halaman Tidak Ditemukan
              </h2>
              <p className="text-lg sm:text-xl text-mitsu-gray max-w-lg mx-auto leading-relaxed">
                Sepertinya kamu mengambil jalanan yang salah. Halaman yang kamu cari sedang hilang di bengkel kami.
              </p>
            </motion.div>

            {/* Decorative Line */}
            <motion.div
              variants={itemVariants}
              className="h-1 w-24 bg-gradient-to-r from-mitsu-red to-transparent mx-auto mb-12"
            />

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                href="/"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-mitsu-red text-white font-bold rounded-lg hover:bg-mitsu-red/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-mitsu-red/20"
              >
                <Home className="h-5 w-5" />
                Kembali ke Beranda
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/#blog"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-mitsu-red text-mitsu-red font-bold rounded-lg hover:bg-mitsu-red/10 transition-all duration-300"
              >
                <Search className="h-5 w-5" />
                Jelajahi Blog
              </Link>
            </motion.div>

            {/* Fun Message */}
            <motion.div
              variants={itemVariants}
              className="mt-16 p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10"
            >
              <p className="text-mitsu-gray text-sm sm:text-base">
                💡 <span className="text-white font-semibold">Pro Tip:</span> Seperti mobil Mitsubishi kami, navigasi yang benar akan membawamu ke tujuan!
              </p>
            </motion.div>

            {/* Floating Elements Animation */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-10 left-10 text-mitsu-red/20 text-6xl pointer-events-none hidden lg:block"
            >
              🚗
            </motion.div>
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              className="absolute bottom-20 right-10 text-mitsu-red/20 text-6xl pointer-events-none hidden lg:block"
            >
              🛣️
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
