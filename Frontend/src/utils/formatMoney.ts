const rnd = (n, precision) => {
  let round = Math.round;
  let prec = 10 ** precision;
  return round(n * prec) / prec;
}

export const formatMoney = (money) => {
  let floor = Math.floor, abs = Math.abs, log = Math.log
  let abbrev = ['k', 'M', 'B']; // abbreviations in steps of 1000x; extensible if need to edit
  let min = Math.min;
  let base = floor(log(abs(money)) / log(1000));
  let suffix = abbrev[min(abbrev.length - 1, base - 1)];
  base = abbrev.indexOf(suffix) + 1;
  return suffix ? rnd(money / 1000 ** base, 2) + suffix : '' + money;
}

export const formatMoneyWithVND = (amount: number) => {
  if (!amount || amount === 0) {
    return '0 đ';
  }
  return `${Math.ceil(Number(amount))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND`;
}

export const formatMoneyNotVND = (amount: number) => {
  if (!amount || amount === 0) {
    return '0 đ';
  }
  return `${Math.ceil(Number(amount))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}

export const addCommas = (num) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");