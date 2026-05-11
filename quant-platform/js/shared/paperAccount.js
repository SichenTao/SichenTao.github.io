import { roundLot } from "./format.js";

export class PaperAccount {
  constructor({ initialCash = 100000 } = {}) {
    this.initialCash = Number(initialCash || 100000);
    this.reset(this.initialCash);
  }

  reset(initialCash = this.initialCash) {
    this.initialCash = Number(initialCash || 100000);
    this.cash = this.initialCash;
    this.positions = {};
    this.ledger = [];
  }

  equity(priceBySymbol = {}) {
    return (
      this.cash +
      Object.entries(this.positions).reduce((total, [symbol, quantity]) => total + Number(quantity) * Number(priceBySymbol[symbol] || 0), 0)
    );
  }

  position(symbol) {
    return Number(this.positions[symbol] || 0);
  }

  buy(symbol, price, requestedQuantity) {
    let quantity = roundLot(requestedQuantity);
    const unitPrice = Number(price || 0);
    while (quantity > 0 && quantity * unitPrice + estimateFee("buy", quantity * unitPrice) > this.cash + 1e-9) {
      quantity -= 100;
    }
    if (quantity <= 0 || unitPrice <= 0) return null;
    const notional = quantity * unitPrice;
    this.cash -= notional + estimateFee("buy", notional);
    this.positions[symbol] = this.position(symbol) + quantity;
    return this.record("buy", symbol, quantity, unitPrice);
  }

  sell(symbol, price, requestedQuantity) {
    let quantity = Math.min(roundLot(requestedQuantity), this.position(symbol));
    const unitPrice = Number(price || 0);
    if (quantity <= 0 || unitPrice <= 0) return null;
    const notional = quantity * unitPrice;
    this.cash += notional - estimateFee("sell", notional);
    this.positions[symbol] = this.position(symbol) - quantity;
    if (this.positions[symbol] <= 0) delete this.positions[symbol];
    return this.record("sell", symbol, quantity, unitPrice);
  }

  record(side, symbol, quantity, price) {
    const fill = {
      side,
      symbol,
      quantity,
      price,
      notional: quantity * price,
      time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }),
    };
    this.ledger.unshift(fill);
    return fill;
  }
}

export function estimateFee(side, notional) {
  if (notional <= 0) return 0;
  const commission = Math.max(5, notional * 2.5 / 10000);
  const transfer = notional * 0.1 / 10000;
  const stamp = side === "sell" ? notional * 5 / 10000 : 0;
  return commission + transfer + stamp;
}
