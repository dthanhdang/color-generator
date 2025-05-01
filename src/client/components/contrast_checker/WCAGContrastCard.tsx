export function WCAGContrastCard() {
  return (
    <div className="mt-6 p-4 border rounded-md bg-gray-50">
      <h2 className="text-lg font-medium mb-3">
        Understanding WCAG Contrast Ratios
      </h2>
      <p className="text-sm mb-4">
        The contrast ratio between text and its background is crucial for web
        accessibility. WCAG guidelines define minimum thresholds to ensure
        content readability for all users, including those with visual
        impairments. A higher ratio indicates better contrast and better
        readability.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 py-2 text-left">WCAG Level</th>
              <th className="px-2 py-2 text-left">Text Size</th>
              <th className="px-2 py-2 text-left">Minimum Ratio</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-2 py-2">AA (standard)</td>
              <td className="px-2 py-2">Normal text (&lt;18pt)</td>
              <td className="px-2 py-2">4.5:1</td>
            </tr>
            <tr className="border-t">
              <td className="px-2 py-2">AA</td>
              <td className="px-2 py-2">Large text (≥18pt or ≥14pt bold)</td>
              <td className="px-2 py-2">3:1</td>
            </tr>
            <tr className="border-t">
              <td className="px-2 py-2">AAA (enhanced)</td>
              <td className="px-2 py-2">Normal text (&lt;18pt)</td>
              <td className="px-2 py-2">7:1</td>
            </tr>
            <tr className="border-t">
              <td className="px-2 py-2">AAA</td>
              <td className="px-2 py-2">Large text (≥18pt or ≥14pt bold)</td>
              <td className="px-2 py-2">4.5:1</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-sm mt-3">
        A 4-5 star rating indicates meeting the strictest standards (AAA), 3
        stars correspond to AA level, while 1-2 stars signal insufficient
        contrast that could make content inaccessible to many users.
      </p>
    </div>
  )
}
