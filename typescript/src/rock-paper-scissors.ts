export function rps(p1: string, p2: string): string{
  if (p1 === p2) {
    return "Draw!"
  }
  if (p2Won[p1] === p2) {
    return 'Player 2 won!'
  }
  return 'Player 1 won!'
}

const p2Won: Record<string, string> = {
  scissors: 'rock',
  rock: 'paper',
  paper: 'scissors'
}