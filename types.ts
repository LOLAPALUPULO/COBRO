
export interface FeriaParams {
  nombreFeria: string;
  fechaFeria: string;
  valorPintqa: number;
  valorLitro: number;
  ventasCerradas: boolean;
}

export interface SalesCounters {
  digitalCount: number;
  billeteCount: number;
}

export type UserLevel = 'admin' | 'seller' | null;
    