import React, { Component } from "react";
import { render } from "react-dom";
import { Footer } from "./footer";
import "./style.css";

interface AppProps {}
interface AppState {
  result: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      result: "0"
    };
    this.clear = this.clear.bind(this);
    this.enterNumber = this.enterNumber.bind(this);
    this.enterDecimal = this.enterDecimal.bind(this);
    this.enterZero = this.enterZero.bind(this);
    this.enterOperator = this.enterOperator.bind(this);
    this.enterMinus = this.enterMinus.bind(this);
    this.solve = this.solve.bind(this);
  }

  clear() {
    this.setState({ result: "0" });
  }

  enterZero() {
    this.setState(state => {
      const numbers = `${state.result}0`.replace(/^0+/, "0");
      return { result: numbers };
    });
  }

  enterNumber(num: number) {
    return () =>
      this.setState(state => {
        const numbers = `${state.result.replace(/^0+$/, "")}${num}`;
        return { result: numbers };
      });
  }

  enterDecimal() {
    this.setState(state => {
      const numbers = state.result.split(/[+\-/x]/);
      const lastNumber = numbers[numbers.length - 1];

      return {
        result: /\./.test(lastNumber) ? state.result : state.result + "."
      };
    });
  }

  solve() {
    this.setState(state => {
      try {
        return {
          result: `${eval(state.result.replaceAll("x", "*"))}`
        };
      } catch (e) {
        debugger;
      }
    });
  }

  enterOperator(operator: string) {
    return () =>
      this.setState(state => ({
        result: `${state.result.replace(/[x/+\-]+$/, "")}${operator}`
      }));
  }

  enterMinus() {
    this.setState(state => ({
      result: `${state.result.replace(/[\-]+$/, "")}-`
    }));
  }

  render() {
    return (
      <div className="jumbotron jumbotron-fluid h-100 m-0">
        <div className="h-100 d-flex flex-column align-items-stretch">
          <div className="flex-grow-1 d-flex align-items-center justify-content-center">
            <div id="drum-machine">
              <div className="container">
                <div className="row">
                  <div id="display" className="col-12 text-right">
                    {this.state.result}
                  </div>
                </div>
                <div className="row">
                  <button
                    onClick={this.clear}
                    id="clear"
                    type="button"
                    className="col-6 btn btn-outline-info"
                  >
                    AC
                  </button>
                  <button
                    onClick={this.enterOperator("/")}
                    id="divide"
                    type="button"
                    className="col-3 btn btn-outline-info"
                  >
                    /
                  </button>
                  <button
                    onClick={this.enterOperator("x")}
                    id="multiply"
                    type="button"
                    className="col-3 btn btn-outline-info"
                  >
                    x
                  </button>
                </div>
                <div className="row">
                  <div className="col-9">
                    <div className="row">
                      <button
                        onClick={this.enterNumber(7)}
                        id="seven"
                        type="button"
                        className="col-4 btn btn-outline-info"
                      >
                        7
                      </button>
                      <button
                        onClick={this.enterNumber(8)}
                        id="eight"
                        type="button"
                        className="col-4 btn btn-outline-info"
                      >
                        8
                      </button>
                      <button
                        onClick={this.enterNumber(9)}
                        id="nine"
                        type="button"
                        className="col-4 btn btn-outline-info"
                      >
                        9
                      </button>
                    </div>
                    <div className="row">
                      <button
                        onClick={this.enterNumber(4)}
                        id="four"
                        type="button"
                        className="col btn btn-outline-info"
                      >
                        4
                      </button>
                      <button
                        onClick={this.enterNumber(5)}
                        id="five"
                        type="button"
                        className="col btn btn-outline-info"
                      >
                        5
                      </button>
                      <button
                        onClick={this.enterNumber(6)}
                        id="six"
                        type="button"
                        className="col btn btn-outline-info"
                      >
                        6
                      </button>
                    </div>
                    <div className="row">
                      <button
                        onClick={this.enterNumber(1)}
                        id="one"
                        type="button"
                        className="col btn btn-outline-info"
                      >
                        1
                      </button>
                      <button
                        onClick={this.enterNumber(2)}
                        id="two"
                        type="button"
                        className="col btn btn-outline-info"
                      >
                        2
                      </button>
                      <button
                        onClick={this.enterNumber(3)}
                        id="three"
                        type="button"
                        className="col btn btn-outline-info"
                      >
                        3
                      </button>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="row">
                      <button
                        onClick={this.enterMinus}
                        id="subtract"
                        type="button"
                        className="col btn btn-outline-info"
                      >
                        -
                      </button>
                    </div>
                    <div className="row">
                      <button
                        onClick={this.enterOperator("+")}
                        id="add"
                        type="button"
                        className="col btn btn-outline-info"
                      >
                        +
                      </button>
                    </div>
                    <div className="row">
                      <button
                        onClick={this.solve}
                        id="equals"
                        type="button"
                        className="col btn btn-outline-info"
                      >
                        =
                      </button>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <button
                    onClick={this.enterZero}
                    id="zero"
                    type="button"
                    className="col-6 btn btn-outline-info"
                  >
                    0
                  </button>
                  <button
                    onClick={this.enterDecimal}
                    id="decimal"
                    type="button"
                    className="col-3 btn btn-outline-info"
                  >
                    .
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
