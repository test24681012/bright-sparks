import { useState, useCallback } from 'react';

interface GameState {
  xp: number;
  streak: number;
  completedLessons: string[];
  trophies: string[];
}

const STORAGE_KEY = 'promptly-game-state';

const getInitialState = (): GameState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { xp: 0, streak: 3, completedLessons: [], trophies: [] };
};

export const useGameState = () => {
  const [state, setState] = useState<GameState>(getInitialState);

  const persist = useCallback((newState: GameState) => {
    setState(newState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  }, []);

  const addXp = useCallback((amount: number) => {
    persist({ ...state, xp: state.xp + amount });
  }, [state, persist]);

  const completeLesson = useCallback((lessonId: string, xpReward: number) => {
    if (state.completedLessons.includes(lessonId)) return;
    persist({
      ...state,
      xp: state.xp + xpReward,
      completedLessons: [...state.completedLessons, lessonId],
      streak: state.streak + 1,
    });
  }, [state, persist]);

  const isLessonCompleted = useCallback((lessonId: string) => {
    return state.completedLessons.includes(lessonId);
  }, [state.completedLessons]);

  return { ...state, addXp, completeLesson, isLessonCompleted };
};
