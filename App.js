import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class App extends Component {
  state = {...initialState};

  addDigito = n => {
    if (n === '.' && !clearDisplay && this.state.displayValue.includes('.')) {
      return;
    }
    const clearDisplay =
      this.state.displayValue === '0' || this.state.clearDisplay;
    const currentValue = clearDisplay ? '' : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({displayValue, clearDisplay: false});

    if (n !== '.') {
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[this.state.current] = newValue;
      this.setState({values});
    }
  };

  clearMemory = () => {
    // this.setState({displayValue: '0'});
    this.setState({...initialState});
  };

  setOperation = operation => {
    if (this.state.current === 0) {
      this.setState({operation, current: 1, clearDisplay: true});
    } else {
      const equals = operation === '=';
      const values = [...this.state.values];
      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`); // eval(new String("2 + 2")); // retorna um objeto String contendo "2 + 2" retorna 4
      } catch (e) {
        values[0] = this.state.values[0];
      }

      values[1] = 0;
      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        // clearDisplay: !equals, (com !equals sempre limpa o display nas operações)
        clearDisplay: true,
        values,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue} />
        <Text style={styles.buttons}>
          <Button label="AC" triple onClick={this.clearMemory} />
          <Button label="/" operation onClick={this.setOperation} />
          <Button label="7" onClick={this.addDigito} />
          <Button label="8" onClick={this.addDigito} />
          <Button label="9" onClick={this.addDigito} />
          <Button label="*" operation onClick={this.setOperation} />
          <Button label="4" onClick={this.addDigito} />
          <Button label="5" onClick={this.addDigito} />
          <Button label="6" onClick={this.addDigito} />
          <Button label="-" operation onClick={this.setOperation} />
          <Button label="1" onClick={this.addDigito} />
          <Button label="2" onClick={this.addDigito} />
          <Button label="3" onClick={this.addDigito} />
          <Button label="+" operation onClick={this.setOperation} />
          <Button label="0" double onClick={this.addDigito} />
          <Button label="." onClick={this.addDigito} />
          <Button label="=" operation onClick={this.setOperation} />
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row', // row pra ficar em linha
    flexWrap: 'wrap', // wrap para quebrar a linha e caber tudo na tela
  },
});
