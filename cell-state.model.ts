export class CellState {
  m_X = 0;
  m_Y = 0;
  m_bPurchased = false;

  constructor(x: number, y: number) {
    this.m_X = x;
    this.m_Y = y;
  }

  X() {
    return this.m_X;
  }

  Y() {
    return this.m_Y;
  }

  private m_probability = 1;

  get Probability() {
    return this.m_probability;
  }

  set Probability(value: number) {
    if (this.m_probability != 0) {
      if (value < 0) {
        this.m_probability = 0;
      } else {
        this.m_probability = value;
      }
    }
  }

  BanCell() {
    this.m_probability = 0;
  }

  MarkAsPurchased() {
    this.m_bPurchased = true;
  }

  Purchased() {
    return this.m_bPurchased;
  }

  private m_tryPurchase = false;
  get TryPurchase() {
    return this.m_tryPurchase;
  }
  set TryPurchase(value: boolean) {
    this.m_tryPurchase = value;
  }

  private m_estimatedReserve = 0;
  get Estimatedreserve() {
    return this.m_estimatedReserve;
  }
  set Estimatedreserve(value: number) {
    this.m_estimatedReserve = value;
  }

  private m_recoverableReserve = 0;
  get RecoverableReserve() {
    return this.m_recoverableReserve;
  }
  set RecoverableReserve(value: number) {
    this.m_recoverableReserve = value;
  }

  private m_bIsProducing = false;
  get Producing() {
    return this.m_bIsProducing;
  }
  set Producing(value: boolean) {
    this.m_bIsProducing = value;
  }

  private m_bIsProducingStopRequested = false;
  get ProducingStopRequested() {
    return this.m_bIsProducingStopRequested;
  }
  set ProducingStopRequested(value: boolean) {
    this.m_bIsProducingStopRequested = value;
  }

  private m_production = 0;
  get Production() {
    return this.m_production;
  }
  set Production(value: number) {
    this.m_production = value;
  }

  private m_isDrilled = false;
  get Drilled() {
    return this.m_isDrilled;
  }
  set Drilled(value: boolean) {
    this.m_isDrilled = value;
  }

  private m_isExplored = false;
  get Explored() {
    return this.m_isExplored;
  }
  set Explored(value: boolean) {
    this.m_isExplored = value;
  }

  private m_flagForStim = false;
  get FlagForStim() {
    return this.m_flagForStim;
  }
  set FlagForStim(value: boolean) {
    this.m_flagForStim = value;
  }

  private m_stimed = false;
  get Stimmed() {
    return this.m_stimed;
  }
  set Stimmed(value: boolean) {
    this.m_stimed = value;
  }
}
