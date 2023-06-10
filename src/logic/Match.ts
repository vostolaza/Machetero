class Match {
  numPlayers: number;
  grid: number[][];

  constructor(numPlayers: number, grid: number[][]) {
    this.numPlayers = numPlayers;
    this.grid = grid;
  }

  getHalfMatch = (startingHole: number) => {
    let points = Array(this.numPlayers).fill(0);
    for (let i = startingHole - 1; i < startingHole + 8; i++) {
      // Add +1 in points on the index of the player with the lowest score in this.grid[i]
      let bestScore = Math.min(...this.grid[i]);
      for (let j = 0; j < this.numPlayers; j++) {
        if (this.grid[i][j] === bestScore) {
          points[j]++;
        }
      }
    }
    return points;
  };

  assignPayout = (points: number[]): number[] => {
    let payouts = Array(this.numPlayers).fill(0);
    let bestScore = Math.max(...points);
    let numWinners = 0;
    for (let i = 0; i < this.numPlayers; i++) {
      if (points[i] === bestScore) {
        numWinners += 1;
      }
    }

    if (numWinners > this.numPlayers - numWinners) {
      return payouts;
    } else {
      for (let i = 0; i < this.numPlayers; i++) {
        if (points[i] === bestScore) {
          payouts[i] = ((this.numPlayers - numWinners) * 5) / numWinners;
        } else {
          payouts[i] = -5;
        }
      }
    }
    return payouts;
  };

  getMatch = () => {
    let pointsIn: number[] = this.getHalfMatch(1);
    let pointsOut: number[] = this.getHalfMatch(10);
    let pointsGeneral: number[] = Array(this.numPlayers).fill(0);
    for (let i = 0; i < this.numPlayers; i++) {
      pointsGeneral[i] = pointsIn[i] + pointsOut[i];
    }

    let payoutIn = this.assignPayout(pointsIn);
    let payoutOut = this.assignPayout(pointsOut);
    let payoutGeneral = this.assignPayout(pointsGeneral);

    let payoutTotal = Array(this.numPlayers).fill(0);
    for (let i = 0; i < this.numPlayers; i++) {
      payoutTotal[i] = payoutIn[i] + payoutOut[i] + payoutGeneral[i];
    }

    let out = `Puntos ida: ${pointsIn.toString()}
    Pago ida: ${payoutIn.toString()}\n
    Puntos vuelta: ${pointsOut.toString()}
    Pago vuelta: ${payoutOut.toString()}\n
    Puntos general: ${pointsGeneral.toString()}
    Pago general: ${payoutGeneral.toString()}\n

    Pago total: ${payoutTotal.toString()}`;

    return out;
  };
}

export default Match;
