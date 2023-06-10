import SETTINGS from "../constants/GameSettings";
import CLUBS from "../constants/Clubs";

class Individuales {
  numPlayers: number;
  grid: number[][];
  hcp: number[];
  strokes;

  constructor(numPlayers: number, grid: number[][]) {
    this.numPlayers = numPlayers;
    this.grid = grid;
    this.strokes = CLUBS["CCLP"].strokes;
    this.hcp = [];
    for (let i = 0; i < this.numPlayers; i++) {
      this.hcp.push(Math.round(grid[18][i] * SETTINGS.hcpPercentage));
    }
  }

  assignPayout = (points: number[]): number[] => {
    let payouts: number[] = Array(this.numPlayers).fill(0);
    // TODO: Payouts individuales
    return payouts;
  };

  calculateMatch = (playerOne: number, playerTwo: number) => {
    let tempGrid = [...this.grid];
    let strokesGiven = this.hcp[playerOne] - this.hcp[playerTwo];
    console.log(`Strokes given: ${strokesGiven}`);
    let reciever = strokesGiven > 0 ? playerOne : playerTwo;
    if (strokesGiven) {
      strokesGiven = Math.abs(strokesGiven);
      for (let i = 0; i < 18; i++) {
        if (this.strokes[i] <= strokesGiven) {
          tempGrid[i][reciever] - 1;
        }
        if (this.strokes[i] + 18 <= strokesGiven) {
          tempGrid[i][reciever] - 1;
        }
      }
    }

    let score = 0;
    for (let i = 0; i < 18; i++) {
      if (tempGrid[i][playerOne] < tempGrid[i][playerTwo]) {
        score++;
      } else if (tempGrid[i][playerOne] > tempGrid[i][playerTwo]) {
        score -= 1;
      }
      if (Math.abs(score) > 18 - i) {
        break;
      }
    }

    return score;
  };

  getIndividuales = () => {
    let result: number[] = Array(this.numPlayers).fill(0);

    for (let i = 0; i < this.numPlayers; i++) {
      for (let j = i + 1; j < this.numPlayers; j++) {
        let score = this.calculateMatch(i, j);
        console.log(`Match ${i} vs ${j}: ${score}`);
        if (score > 0) {
          result[i] += 1;
          result[j] -= 1;
        } else if (score < 0) {
          result[i] -= 1;
          result[j] += 1;
        }
      }
    }

    for (let i = 0; i < this.numPlayers; i++) {
      result[i] *= 10;
    }

    return result.toString();
  };
}

export default Individuales;
