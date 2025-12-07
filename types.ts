
export type UserRole = 'admin' | 'sales';

export interface FeriaConfig {
  nombreFeria: string;
  fechaInicio: string; // ISO date string e.g., 'YYYY-MM-DD'
  fechaFin: string;   // ISO date string e.g., 'YYYY-MM-DD'
  valorPinta: number;
  valorLitro: number;
}

export type TipoUnidad = 'Pinta' | 'Litro';
export type TipoPago = '$ Digital' | '$ Billete';

export interface SaleRecord {
  id: string; // Unique ID for each sale
  fechaVenta: string; // ISO date string + time
  tipoUnidad: TipoUnidad;
  cantidadUnidades: number;
  montoTotal: number;
  tipoPago: TipoPago;
  usuarioVenta: string; // Always 'lol' for sales user
}
