import { useState, useCallback } from "react";

interface UseProgressLoaderOptions {
  initialProgress?: number;
  completionDelay?: number;
}

interface UseProgressLoaderReturn {
  progress: number;
  isLoading: boolean;
  startProgress: (initial?: number) => void;
  updateProgress: (value: number) => void;
  doneProgress: () => void;
  resetProgress: () => void;
}

export function useProgressLoader(
  options: UseProgressLoaderOptions = {}
): UseProgressLoaderReturn {
  const {
    initialProgress = 10,
    completionDelay = 500,
  } = options;

  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startProgress = useCallback((initial = initialProgress) => {
    setProgress(Math.min(Math.max(initial, 0), 100));
    setIsLoading(true);
  }, [initialProgress]);

  const updateProgress = useCallback((value: number) => {
    setProgress(Math.min(Math.max(value, 0), 100));
  }, []);

  const doneProgress = useCallback(() => {
    setProgress(100);
    const timer = setTimeout(() => setIsLoading(false), completionDelay);
    return () => clearTimeout(timer);
  }, [completionDelay]);

  const resetProgress = useCallback(() => {
    setProgress(0);
    setIsLoading(false);
  }, []);

  return {
    progress,
    isLoading,
    startProgress,
    updateProgress,
    doneProgress,
    resetProgress,
  };
}
