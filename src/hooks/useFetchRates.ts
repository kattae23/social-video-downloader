import { useEffect, useState } from "react";

export interface RateProps {
  fuente: string;
  nombre: string;
  compra: null;
  venta: null;
  promedio: number;
  fechaActualizacion: Date;
}

const useFetchRates = (url: string) => {
  const [rates, setRates] = useState<null | RateProps>(null);
  const fetchRates = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setRates(data);
  };

  useEffect(() => {
    fetchRates();
  }, []);
  return [rates];
};

export default useFetchRates;
