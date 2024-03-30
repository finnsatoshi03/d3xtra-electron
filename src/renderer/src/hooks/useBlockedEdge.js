export const useBlockedEdge = () => {
  const getBlockedEdge = (index) => {
    if (index >= 0 && index <= 2) return 0;
    if (index >= 3 && index <= 4) return 1;
    if (index >= 5 && index <= 6) return 2;
    if (index >= 7 && index <= 9) return 3;
    if (index >= 10 && index <= 12) return 4;
    if (index >= 13 && index <= 15) return 5;
    if (index >= 16 && index <= 18) return 6;
    if (index >= 19 && index <= 21) return 7;
    if (index >= 22 && index <= 24) return 8;
    if (index >= 25 && index <= 27) return 9;
    if (index >= 28 && index <= 30) return 10;
    if (index >= 31 && index <= 33) return 11;
    if (index >= 34 && index <= 36) return 13;
    if (index >= 37 && index <= 39) return 12;
    if (index >= 40 && index <= 42) return 14;
    if (index >= 43 && index <= 45) return 15;
    if (index >= 46 && index <= 48) return 16;
    if (index >= 49 && index <= 51) return 17;
    if (index >= 52 && index <= 54) return 18;
    if (index >= 55 && index <= 56) return 19;
    if (index >= 57 && index <= 59) return 20;
    if (index >= 60 && index <= 62) return 21;
    if (index >= 63 && index <= 65) return 22;
    if (index >= 66 && index <= 67) return 23;
    console.log("No edge to block");
    return null;
  };

  return { getBlockedEdge };
};
