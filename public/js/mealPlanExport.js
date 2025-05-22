//tryouts by MD

// /public/js/mealplan.js
/* global jspdf */
(function () {
  // ------------------------------------------------------------------
  // Attach handler to the “Export Meal Plan” button
  // ------------------------------------------------------------------
  document
    .getElementById('btn-export-mealplan')
    .addEventListener('click', async () => {
      try {
        //     1️⃣  Pull data from your API
        //       - replace /api/mealplan with your real endpoint
        const res = await fetch('http://localhost:3000/api/meals/generate');
        const { weeklyMealPlan } = await res.json();

        //     2️⃣  Generate PDF
        createMealPlanPDF(weeklyMealPlan);
      } catch (err) {
        console.error('Meal-plan export failed:', err);
        alert('Could not export meal plan.');
      }
    });

  // ------------------------------------------------------------------
  // Core PDF generator
  // ------------------------------------------------------------------
  function createMealPlanPDF(plan) {
    /* jsPDF 2.x in UMD builds is exposed on window.jspdf */
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });

    const PAGE_WIDTH = doc.internal.pageSize.getWidth();
    const PAGE_HEIGHT = doc.internal.pageSize.getHeight();
    const LEFT = 40;
    const LINE_HEIGHT = 16;
    const MAX_Y = PAGE_HEIGHT - 40;

    let y = 40;

    // ---- Header ----------------------------------------------------
    doc.setFontSize(20).text('NutriPlan – Weekly Meal Plan', LEFT, y);
    y += LINE_HEIGHT * 1.5;

    doc.setFontSize(12);
    doc.text(`User: ${plan.userEmail}`, LEFT, y);
    y += LINE_HEIGHT;

    doc.text(
      `Generated: ${new Date(plan.createdAt).toLocaleDateString()}`,
      LEFT,
      y
    );
    y += LINE_HEIGHT * 1.5;

    // ---- Loop through each day -------------------------------------
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);

    plan.dailyPlans.forEach((dayPlan, dayIdx) => {
      // Page break helper
      y = ensureSpace(LEFT, y, LINE_HEIGHT, doc, MAX_Y);

      // Day header
      doc.setFont(undefined, 'bold').text(dayPlan.day, LEFT, y);
      doc.setFont(undefined, 'normal');
      y += LINE_HEIGHT;

      // Meals
      dayPlan.meals.forEach((meal) => {
        y = ensureSpace(LEFT, y, LINE_HEIGHT * 5, doc, MAX_Y);

        doc
          .setFontSize(12)
          .text(`• ${meal.name} – ${meal.calories} kcal`, LEFT + 10, y);
        y += LINE_HEIGHT;

        doc.setFontSize(10);
        doc.text(
          `Ingredients: ${meal.ingredients.join(', ')}`,
          LEFT + 20,
          y,
          { maxWidth: PAGE_WIDTH - 2 * LEFT - 20 }
        );
        y += LINE_HEIGHT;

        doc.text(
          `Macros: P ${meal.nutrients.protein}  |  F ${meal.nutrients.fat}  |  C ${meal.nutrients.carbs}`,
          LEFT + 20,
          y
        );
        y += LINE_HEIGHT * 1.2;
      });

      // Daily total calories (if you store per-day totals)
      if (plan.totalCaloriesPerDay) {
        y = ensureSpace(LEFT, y, LINE_HEIGHT * 2, doc, MAX_Y);
        doc.text(
          `Estimated total calories: ${plan.totalCaloriesPerDay} kcal`,
          LEFT + 10,
          y
        );
        y += LINE_HEIGHT * 1.5;
      }
    });

    // ---- Save the PDF ----------------------------------------------
    doc.save('meal-plan.pdf');
  }

  // ------------------------------------------------------------------
  // Utility: add a new page if not enough vertical space remains
  // ------------------------------------------------------------------
  function ensureSpace(left, currentY, neededHeight, doc, maxY) {
    if (currentY + neededHeight > maxY) {
      doc.addPage();
      currentY = 40; // reset top margin on new page
    }
    return currentY;
  }
  
})();