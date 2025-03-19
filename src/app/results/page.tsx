import Math from '@/components/Math';

export default function ResultsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-4xl font-bold">Results & Evaluation</h1>
        <p className="mb-8 text-lg text-blue-600 font-semibold">
          Presented at AAAI25, the 39th Annual AAAI Conference on Artificial Intelligence, Philadelphia
        </p>
        
        <section className="mb-12">
          <div className="rounded-xl bg-white p-8 shadow-md">
            <h2 className="mb-6 text-3xl font-bold">Experimental Setup</h2>
            <p className="mb-4 text-lg text-slate-700">
              We evaluated DPPL methods across multiple dimensions to comprehensively assess their performance:
            </p>
            
            {/* <h3 className="mb-4 mt-8 text-2xl font-semibold">Encoders</h3>
            <p className="mb-4 text-lg text-slate-700">
              Four state-of-the-art pre-trained encoders were used:
            </p>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-lg text-slate-700">
              <li>ViT-H-14</li>
              <li>ViT-L-14</li>
              <li>ViT-B-16</li>
              <li>ResNet-50</li>
            </ul>
            
            <h3 className="mb-4 mt-8 text-2xl font-semibold">Datasets</h3>
            <p className="mb-4 text-lg text-slate-700">
              Four vision datasets with varying characteristics:
            </p>
            <ul className="mb-6 list-disc space-y-2 pl-6 text-lg text-slate-700">
              <li>CIFAR-10</li>
              <li>CIFAR-100</li>
              <li>ImageNet</li>
              <li>Flowers-102</li>
            </ul> */}
            
            <h3 className="mb-4 mt-8 text-2xl font-semibold">Evaluation Dimensions</h3>
            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-100 p-4">
                <h4 className="mb-2 font-semibold">Privacy Budget (<Math math="\varepsilon" />)</h4>
                <p className="text-slate-700">
                  Tested across a range of privacy budgets from strict (<Math math="\varepsilon = 0.01" />) to more relaxed (<Math math="\varepsilon = 10" />) settings.
                </p>
              </div>
              <div className="rounded-lg bg-slate-100 p-4">
                <h4 className="mb-2 font-semibold">Imbalance Ratio</h4>
                <p className="text-slate-700">
                  Evaluated on balanced (ratio=1) to highly imbalanced (ratio=100) datasets.
                </p>
              </div>
              <div className="rounded-lg bg-slate-100 p-4">
                <h4 className="mb-2 font-semibold">Encoder</h4>
                <p className="text-slate-700">
                  Tested with ViT-H-14, ViT-L-16, ViT-B-16, and ResNet-50.
                </p>
              </div>
              <div className="rounded-lg bg-slate-100 p-4">
                <h4 className="mb-2 font-semibold">Dataset</h4>
                <p className="text-slate-700">
                  Tested on CIFAR-10, CIFAR-100, STL10, and Food-101.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <div className="rounded-xl bg-white p-8 shadow-md">
            <h2 className="mb-6 text-3xl font-bold">Key Findings</h2>
            
            <h3 className="mb-4 mt-8 text-2xl font-semibold">Dramatic Improvements for Underrepresented Classes</h3>
            <div className="mb-8 grid gap-4 md:grid-cols-5">
              <div className="md:col-span-2">
                <p className="mb-4 text-lg text-slate-700">
                  Our most striking result is the dramatic improvement for underrepresented classes at strict privacy budgets, e.g., <Math math="\varepsilon = 1.0" />:
                </p>
                <ul className="mb-4 list-disc space-y-2 pl-6 text-lg text-slate-700">
                  <li>Classic DP-SGD: <strong>0% accuracy</strong> on smallest minority classes</li>
                  <li>Previous fairness-oriented approaches: <strong>3% accuracy</strong> on minority classes</li>
                  <li>DPPL methods: <strong>60% accuracy</strong> on minority classes</li>
                </ul>
                <p className="text-lg text-slate-700">
                  This represents drastic increases in accuracy on underrepresented groups, with no degradation for majority classes, achieving state-of-the-art results.
                </p>
              </div>
              <div className="md:col-span-3 flex items-center">
                <div className="flex flex-col items-center">
                  <p className="mb-2 text-center font-semibold text-slate-800">
                    Balanced Accuracy of the smallest 25% classes<br />
                    (CIFAR100, ViT-H-14)
                  </p>
                  <div className="flex flex-row items-center">
                    <img 
                      src="/images/minority_acc.png"
                      alt="Performance on Minority Classes"
                      className="max-h-80 object-contain w-full max-w-lg rounded-lg"
                    />
                    <img
                      src="/images/legend.png"
                      alt="Chart Legend"
                      className="ml-4 object-contain max-w-40 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <h3 className="mb-4 mt-8 text-2xl font-semibold">Privacy-Utility Trade-off</h3>
            <div className="mb-8 flex justify-center">
              <div className="flex flex-col items-center">
                <p className="mb-2 text-center font-semibold text-slate-800">Balanced Accuracy (CIFAR100, ViT-H-14)</p>
                <div className="flex flex-row items-center">
                  <img 
                    src="/images/results.png"
                    alt="CIFAR100 Results with ViT-H-14 Encoder"
                    className="max-h-80 object-contain w-full max-w-2xl rounded-lg"
                  />
                  <img
                    src="/images/legend.png"
                    alt="Chart Legend"
                    className="ml-4 object-contain max-w-40 rounded-lg"
                  />
                </div>
              </div>
            </div>
            <p className="mb-6 text-lg text-slate-700">
              DPPL methods maintain high accuracy even at very strict privacy budgets (<Math math="\varepsilon = 0.1" />), significantly outperforming DP-SGD in this regime. As <Math math="\varepsilon" /> increases, the performance gap narrows, but DPPL methods remain competitive across all privacy settings. The results above show performance on CIFAR100 using the ViT-H-14 encoder with 10 samples per class.
            </p>
            
            <h3 className="mb-4 mt-8 text-2xl font-semibold">Performance on Imbalanced Data</h3>
            <div className="mb-8 flex justify-center">
              <div className="flex flex-col items-center">
                <p className="mb-2 text-center font-semibold text-slate-800">Balanced Accuracy (CIFAR100, ViT-H-14)</p>
                <div className="flex flex-row items-center">
                  <img 
                    src="/images/results_imbalanced.png"
                    alt="Performance with Imbalanced Data"
                    className="max-h-80 object-contain w-full max-w-2xl rounded-lg"
                  />
                  <img
                    src="/images/legend.png"
                    alt="Chart Legend"
                    className="ml-4 object-contain max-w-40 rounded-lg"
                  />
                </div>
              </div>
            </div>
            <p className="mb-6 text-lg text-slate-700">
              DPPL methods show remarkable robustness to class imbalance. Even with extreme imbalance ratios of 100:1 between the most and least represented classes, the accuracy drop is minimal compared to balanced datasets. This is a significant advantage over traditional methods that struggle with imbalanced private data. For the CIFAR100 dataset with the ViT-H-14 encoder, DPPL methods maintained over 85% of their accuracy when trained on highly imbalanced data, while DP-SGD approaches lost significant performance.
            </p>
            
            {/* <h3 className="mb-4 mt-8 text-2xl font-semibold">Comparative Performance</h3> */}
            {/* <div className="mb-6 overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-3 pr-4 font-semibold">Method</th>
                    <th className="py-3 px-4 text-center font-semibold"><Math math="\varepsilon = 0.01" /></th>
                    <th className="py-3 px-4 text-center font-semibold"><Math math="\varepsilon = 0.1" /></th>
                    <th className="py-3 px-4 text-center font-semibold"><Math math="\varepsilon = 1.0" /></th>
                    <th className="py-3 pl-4 text-center font-semibold"><Math math="\varepsilon = 10.0" /></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="py-3 pr-4 font-medium">DP-SGD</td>
                    <td className="py-3 px-4 text-center">15.2%</td>
                    <td className="py-3 px-4 text-center">38.6%</td>
                    <td className="py-3 px-4 text-center">58.4%</td>
                    <td className="py-3 pl-4 text-center">72.3%</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-3 pr-4 font-medium">DPPL-Mean</td>
                    <td className="py-3 px-4 text-center">33.5%</td>
                    <td className="py-3 px-4 text-center">52.7%</td>
                    <td className="py-3 px-4 text-center">64.8%</td>
                    <td className="py-3 pl-4 text-center">73.2%</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-3 pr-4 font-medium">DPPL-Public</td>
                    <td className="py-3 px-4 text-center">48.6%</td>
                    <td className="py-3 px-4 text-center">62.1%</td>
                    <td className="py-3 px-4 text-center">69.5%</td>
                    <td className="py-3 pl-4 text-center">75.8%</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium">DPPL-Public Top-K</td>
                    <td className="py-3 px-4 text-center">51.2%</td>
                    <td className="py-3 px-4 text-center">66.8%</td>
                    <td className="py-3 px-4 text-center">74.3%</td>
                    <td className="py-3 pl-4 text-center">79.7%</td>
                  </tr>
                </tbody>
              </table>
            </div> */}
            {/* <p className="mb-6 text-sm text-slate-500 italic text-center">
              * Accuracy on CIFAR-100 with balanced classes using ViT-H-14 encoder (10 samples per class)
            </p>
            <p className="text-lg text-slate-700">
              DPPL-Public Top-K consistently outperforms other methods across all privacy budgets, with DPPL-Public as a close second. The improvement is most dramatic at strict privacy budgets, where DPPL provides up to 3x the accuracy of DP-SGD.
            </p> */}
          </div>
        </section>
        
        {/* <section>
          <div className="rounded-xl bg-white p-8 shadow-md">
            <h2 className="mb-6 text-3xl font-bold">Ablation Studies</h2>
            
            <h3 className="mb-4 mt-8 text-2xl font-semibold">Impact of Mean Estimation Method</h3>
            <div className="mb-8 flex justify-center">
              <img 
                src="/images/mean.png"
                alt="Comparison of mean estimation methods"
                className="max-h-80 object-contain w-full max-w-2xl rounded-lg border border-slate-200"
              />
            </div>
            <p className="mb-6 text-lg text-slate-700">
              The choice of mean estimation method significantly affects performance in the DPPL-Mean variant. This figure shows how different approaches perform at varying privacy levels, highlighting the importance of proper calibration of the privacy noise, especially at strict privacy budgets.
            </p>
            
            <h3 className="mb-4 mt-8 text-2xl font-semibold">Effect of K in Top-K</h3>
            <div className="mb-8 flex justify-center">
              <img 
                src="/images/topk.png"
                alt="Optimal K value in DPPL-Public Top-K"
                className="max-h-80 object-contain w-full max-w-2xl rounded-lg border border-slate-200"
              />
            </div>
            <p className="mb-6 text-lg text-slate-700">
              Increasing K generally improves performance up to a point, after which returns diminish or even decrease due to the privacy-utility trade-off. The optimal K value varies based on the dataset, privacy budget, and encoder used. This figure shows how performance varies with different K values for DPPL-Public Top-K.
            </p>
            
            <h3 className="mb-4 mt-8 text-2xl font-semibold">Score Clipping Parameters</h3>
            <p className="text-lg text-slate-700">
              The min_score and max_score parameters in DPPL-Public and DPPL-Public Top-K methods affect both utility and privacy. Properly tuned clipping parameters can significantly improve performance, especially at strict privacy settings. Our experiments suggest that adaptive clipping based on dataset characteristics yields the best results.
            </p>
          </div>
        </section> */}
      </div>
    </div>
  );
}