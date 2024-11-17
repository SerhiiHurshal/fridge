import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="p-3">
      <section className="mb-5">
        <Card className="p-6 shadow-md">
          <CardHeader>
            <CardTitle className="mb-2 text-2xl font-semibold">
              Generate Recipes from Your Ingredients
            </CardTitle>
            <CardDescription className="mb-4">
              Transform your fridge contents into mouthwatering meals with the power of AI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Smart Ingredient Recognition:</strong> Simply input the products you have,
                and our advanced algorithm will suggest creative and delicious recipes that match
                your available items.
              </li>
              <li>
                <strong>Dietary Preferences and Restrictions:</strong> Personalize your recipe
                results to match dietary preferences, whether vegetarian, gluten-free, or any
                specific nutritional focus.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-3">
        <Card className="p-6 shadow-md">
          <CardHeader>
            <CardTitle className="mb-2 text-2xl font-semibold">
              Smart Shopping List Suggestions
            </CardTitle>
            <CardDescription className="mb-4">
              Keep your pantry stocked and your recipes fresh.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Dynamic Shopping List Builder:</strong> Receive intelligent shopping
                suggestions based on the recipes you generate and your usual grocery habits.
              </li>
              <li>
                <strong>Streamlined Experience:</strong> Save time by compiling a comprehensive list
                that accounts for both your current stock and upcoming meals.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12 flex w-full justify-center">
        <Button className="mt-4" size="lg">
          Get Started
        </Button>
      </section>
    </main>
  );
}
