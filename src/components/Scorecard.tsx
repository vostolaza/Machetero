import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import Square from "./Square";
import RectangularButton from "./RectangularButton";
import Sindicato from "../logic/Sindicato";
import Individuales from "../logic/Individuales";
import Match from "../logic/Match";
import CLUBS from "../constants/Clubs";
import SETTINGS from "../constants/GameSettings";

interface Props {
  numPlayers: number;
  club: string;
}

const Scorecard: React.FC<Props> = ({ numPlayers, club }) => {
  const clubData = CLUBS[club];

  const strokes = clubData.strokes;

  const par = clubData.par;

  const [grid, setGrid] = useState<number[][]>(() => {
    const rows = [];
    for (let i = 0; i < 19; i++) {
      const row = [];
      for (let j = 0; j < numPlayers; j++) {
        row.push(0);
      }
      rows.push(row);
    }
    return rows;
  });

  const handleSquareChange = (
    rowIndex: number,
    columnIndex: number,
    number: number
  ) => {
    setGrid((grid) => {
      const newGrid = [...grid];
      newGrid[rowIndex][columnIndex] = number;
      return newGrid;
    });
  };

  const getNetGrid = () => {
    const netGrid = [];
    let hcp = [];
    for (let i = 0; i < numPlayers; i++) {
      hcp.push(Math.round(grid[18][i] * SETTINGS.hcpPercentage));
    }

    for (let i = 0; i < 18; i++) {
      const row = [];
      for (let j = 0; j < numPlayers; j++) {
        if (grid[i][j] == 0) {
          row.push(0);
          continue;
        }
        if (hcp[i] >= strokes[i]) {
          row.push(grid[i][j] - par[i]);
        } else {
          row.push(grid[i][j]);
        }
      }
      netGrid.push(row);
    }
    return netGrid;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.grid}>
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            <View style={styles.column}>
              <Square
                key={-1}
                number={rowIndex == 18 ? "" : rowIndex + 1}
                onChange={() => {}}
                editable={false}
                color={"lightgreen"}
              />
            </View>
            <View style={styles.column}>
              <Square
                key={-1}
                number={par[rowIndex]}
                onChange={() => {}}
                editable={false}
                color={"lightyellow"}
              />
            </View>
            <View style={styles.column}>
              <Square
                key={-1}
                number={strokes[rowIndex]}
                onChange={() => {}}
                editable={false}
                color={"orange"}
              />
            </View>
            {row.map((number, columnIndex) => (
              <Square
                key={columnIndex}
                number={number}
                color={rowIndex === 18 ? "white" : "lightgrey"}
                onChange={(number) =>
                  handleSquareChange(rowIndex, columnIndex, number)
                }
              />
            ))}
          </View>
        ))}
      </View>
      <RectangularButton
        title="Sindicato"
        onPress={new Sindicato(numPlayers, getNetGrid()).getSindicato}
      />
      <RectangularButton
        title="Match por hoyos"
        onPress={new Match(numPlayers, getNetGrid()).getMatch}
      />
      <RectangularButton
        title="Individuales"
        onPress={new Individuales(numPlayers, grid).getIndividuales}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginBottom: 20,
  },
  grid: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
  column: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
});

export default Scorecard;
