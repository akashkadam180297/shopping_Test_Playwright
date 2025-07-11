export function calculateTotal(basket: string[]): string {
    const prices = {
      Apple: 35,
      Banana: 20,
      Melon: 50,
      Lime: 15,
    };
  
    const itemCount = basket.reduce((count, item) => {
      count[item] = (count[item] || 0) + 1;
      return count;
    }, {} as Record<string, number>);
  
    let total = 0;
  
    for (const [item, count] of Object.entries(itemCount)) {
      switch (item) {
        case "Apple":
          total += prices.Apple * count;
          break;
        case "Banana":
          total += prices.Banana * count;
          break;
        case "Melon":
          total += prices.Melon * (Math.floor(count / 2) + (count % 2));
          break;
        case "Lime":
          total += prices.Lime * (count - Math.floor(count / 3));
          break;
        default:
          throw new Error(`Invalid item: ${item}`);
      }
    }
  
    return `£${(total / 100).toFixed(2)}`;
  }