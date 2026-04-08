import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Camera, RefreshCw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function CameraCapture({ onCapture }: { onCapture: (file: File | null) => void }) {
  const { toast } = useToast()
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
  }, [stream])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err) {
      console.error('Error accessing camera', err)
      toast({
        title: 'Câmera indisponível',
        description: 'Não foi possível acessar a câmera. Verifique as permissões.',
        variant: 'destructive',
      })
    }
  }

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0)
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' })
              const url = URL.createObjectURL(blob)
              setPreview(url)
              onCapture(file)
              stopCamera()
            }
          },
          'image/jpeg',
          0.8,
        )
      }
    }
  }

  const retake = () => {
    setPreview(null)
    onCapture(null)
    startCamera()
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [stopCamera])

  if (preview) {
    return (
      <div className="flex flex-col items-center gap-3 w-full p-4 bg-black/30 rounded-lg border border-white/10">
        <img
          src={preview}
          alt="Preview"
          className="w-24 h-24 rounded-full object-cover border-4 border-primary shadow-lg shadow-primary/20"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={retake}
          className="bg-black/50 text-white border-white/20 hover:bg-black/70 font-racing"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Tirar outra foto
        </Button>
      </div>
    )
  }

  if (stream) {
    return (
      <div className="flex flex-col items-center gap-3 w-full p-4 bg-black/30 rounded-lg border border-white/10">
        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-black border-4 border-primary shadow-lg shadow-primary/20">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover transform scale-x-[-1]"
          />
        </div>
        <div className="flex gap-2 w-full max-w-[200px]">
          <Button
            type="button"
            onClick={takePhoto}
            className="flex-1 bg-primary text-black hover:bg-primary/80 font-racing"
          >
            Capturar
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={stopCamera}
            className="flex-1 bg-black/50 text-white border-white/20 hover:bg-black/70 font-racing"
          >
            Cancelar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={startCamera}
      className="w-full h-12 bg-black/50 text-white border-white/20 hover:bg-black/70 font-racing"
    >
      <Camera className="w-5 h-5 mr-2" />
      Tirar Foto do Perfil
    </Button>
  )
}
