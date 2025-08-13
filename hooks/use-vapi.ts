import { useEffect, useRef, useState, useCallback } from "react";
import Vapi from "@vapi-ai/web";

const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "";

const useVapi = (assistantId: string) => {
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [conversation, setConversation] = useState<
    { role: string; text: string; timestamp?: string; isFinal?: boolean }[]
  >([]);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

  const vapiRef = useRef<Vapi | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearCountdown = useCallback(() => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  }, []);

  const initializeVapi = useCallback(() => {
    if (!vapiRef.current && publicKey) {
      const vapi = new Vapi(publicKey);
      vapiRef.current = vapi;

      // Event listeners
      vapi.on("call-start", () => {
        setConnecting(false);
        setConnected(true);
        setIsSessionActive(true);
        setError(null);
        console.log("Call started");

        // Start 10s countdown
        clearCountdown();
        setRemainingSeconds(10);
        countdownIntervalRef.current = setInterval(() => {
          setRemainingSeconds((prev) => {
            if (prev === null) return null;
            const next = prev - 1;
            if (next <= 0) {
              // Auto-end call at 0
              if (vapiRef.current) {
                vapiRef.current.stop();
              }
              return 0;
            }
            return next;
          });
        }, 500);
      });

      vapi.on("call-end", () => {
        setConnecting(false);
        setConnected(false);
        setIsSessionActive(false);
        setAssistantIsSpeaking(false);
        setVolumeLevel(0);
        clearCountdown();
        setRemainingSeconds(0);
        console.log("Call ended");
      });

      vapi.on("speech-start", () => {
        setAssistantIsSpeaking(true);
        console.log("Assistant started speaking");
      });

      vapi.on("speech-end", () => {
        setAssistantIsSpeaking(false);
        console.log("Assistant stopped speaking");
      });

      vapi.on("volume-level", (level: number) => {
        setVolumeLevel(level);
      });

      vapi.on('message', (message: any) => {
        // Log all messages from Vapi for debugging, including function calls and partials
        console.log('Vapi message:', message);

        if (message.type === 'transcript' && message.transcriptType === 'final') {
          // Persist final transcripts of both user and assistant
          const entry = { role: message.role, text: message.transcript } as {
            role: string;
            text: string;
          };
          console.log('Transcript received:', entry);
          setConversation((prev) => [...prev, entry]);
        }
      });

      vapi.on("error", (error: any) => {
        console.error("Vapi error:", error);
        setError(error.message || "An error occurred");
        setConnecting(false);
        setConnected(false);
        setIsSessionActive(false);
      });

      // Handle microphone mute/unmute (if supported by the SDK)
      // Note: These events may not be available in all versions of Vapi SDK
    }
  }, [publicKey]);

  useEffect(() => {
    initializeVapi();

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
        vapiRef.current = null;
      }
      clearCountdown();
    };
  }, [initializeVapi, clearCountdown]);

  const startCall = useCallback(async () => {
    if (!vapiRef.current || !assistantId) {
      console.error("Vapi not initialized or assistant ID not provided");
      return;
    }

    try {
      setConnecting(true);
      setError(null);
      await vapiRef.current.start(assistantId);
    } catch (error: any) {
      console.error("Error starting call:", error);
      setError(error.message || "Failed to start call");
      setConnecting(false);
    }
  }, [assistantId]);

  const endCall = useCallback(() => {
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
  }, []);

  const toggleCall = useCallback(() => {
    if (isSessionActive) {
      endCall();
    } else {
      startCall();
    }
  }, [isSessionActive, startCall, endCall]);

  const toggleMute = useCallback(() => {
    if (vapiRef.current) {
      // Toggle mute state locally since direct mute/unmute may not be available
      setIsMuted(prev => !prev);
      // You may need to implement mute functionality differently based on your Vapi SDK version
    }
  }, []);

  const sendMessage = useCallback((message: string) => {
    if (vapiRef.current && isSessionActive) {
      vapiRef.current.send({
        type: "add-message",
        message: {
          role: "user",
          content: message,
        },
      });
    }
  }, [isSessionActive]);

  return {
    volumeLevel,
    isSessionActive,
    isMuted,
    conversation,
    connecting,
    connected,
    assistantIsSpeaking,
    error,
    remainingSeconds,
    startCall,
    endCall,
    toggleCall,
    toggleMute,
    sendMessage,
  };
};

export default useVapi;