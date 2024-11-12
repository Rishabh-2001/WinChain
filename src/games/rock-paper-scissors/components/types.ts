export type Choice = 'rock' | 'paper' | 'scissors' | null;
export type GameResult = 'win' | 'lose' | 'draw' | null;

export const WINNING_COMBINATIONS = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper',
} as const;