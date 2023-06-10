class Sindicato {
  numPlayers: number;
  grid: number[][];

  constructor(numPlayers: number, grid: number[][]) {
    this.numPlayers = numPlayers;
    this.grid = grid;
  }

  assignPayout = (points: number[]): number[] => {
    let payouts: number[] = Array(this.numPlayers).fill(0);
    let possiblePayouts = [-8, -6, -4, -2].slice(5 - this.numPlayers, 4);
    possiblePayouts.push((this.numPlayers - 1) * this.numPlayers);

    const sortedPoints = [...points].sort((a, b) => a - b);

    for (let i = 0; i < this.numPlayers; i++) {
      const playersWithSamePoints =
        sortedPoints.lastIndexOf(sortedPoints[i]) -
        sortedPoints.indexOf(sortedPoints[i]) +
        1;
      if (playersWithSamePoints === 1) {
        payouts[points.indexOf(sortedPoints[i])] = possiblePayouts[i];
      } else {
        const totalPoints = possiblePayouts
          .slice(i, i + playersWithSamePoints)
          .reduce((a, b) => a + b, 0);
        const pointsPerPlayer = totalPoints / playersWithSamePoints;
        for (let j = 0; j < this.numPlayers; j++) {
          if (points[j] === sortedPoints[i]) {
            payouts[j] = pointsPerPlayer;
          }
        }
        i += playersWithSamePoints - 1;
      }
    }
    return payouts;
  };

  assignPoints = (strokes: number[]): number[] => {
    const points = [8, 6, 4, 2, 0].slice(5 - this.numPlayers, 5);
    const sortedStrokes = [...strokes].sort((a, b) => a - b);

    let result: number[] = Array(this.numPlayers).fill(0);
    for (let i = 0; i < this.numPlayers; i++) {
      const playersWithSameStrokes =
        sortedStrokes.lastIndexOf(sortedStrokes[i]) -
        sortedStrokes.indexOf(sortedStrokes[i]) +
        1;
      if (playersWithSameStrokes === 1) {
        result[strokes.indexOf(sortedStrokes[i])] = points[i];
      } else {
        const totalPoints = points
          .slice(i, i + playersWithSameStrokes)
          .reduce((a, b) => a + b, 0);
        const pointsPerPlayer = totalPoints / playersWithSameStrokes;
        for (let j = 0; j < this.numPlayers; j++) {
          if (strokes[j] === sortedStrokes[i]) {
            result[j] = pointsPerPlayer;
          }
        }
        i += playersWithSameStrokes - 1;
      }
    }

    return result;
  };

  getHalfSindicato = (startingHole: number) => {
    let points = Array(this.numPlayers).fill(0);
    for (let i = startingHole - 1; i < startingHole + 8; i++) {
      let partialSum = 0;
      for (let j = 0; j < this.numPlayers; j++) {
        partialSum += this.grid[i][j];
      }
      if (partialSum === 0) continue;
      let result = this.assignPoints(this.grid[i]);
      for (let j = 0; j < this.numPlayers; j++) {
        points[j] += result[j];
      }
    }

    return points;
  };

  getSindicato = () => {
    let pointsIn: number[] = this.getHalfSindicato(1);
    let pointsOut: number[] = this.getHalfSindicato(10);
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

export default Sindicato;
