import { getTopExpensiveIngredients } from "@/lib/actions/analytics/ingredients";
import { TopExpensiveIngredientsChart } from "./top-expensive-ingredients-chart";

export async function TopExpensiveIngredients() {
    const data = await getTopExpensiveIngredients();
    
    return <TopExpensiveIngredientsChart data={data} />;
}