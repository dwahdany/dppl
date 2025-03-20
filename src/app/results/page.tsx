import Math from '@/components/Math';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ResultsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-4xl font-bold">Results & Evaluation</h1>
        <p className="mb-8 text-lg text-primary font-semibold">
          Presented at AAAI25, the 39th Annual AAAI Conference on Artificial Intelligence, Philadelphia
        </p>
        
        <section className="mb-12">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-3xl">Experimental Setup</CardTitle>
            </CardHeader>
            <CardContent>
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
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Privacy Budget (<Math math="\varepsilon" />)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700">
                      Tested across a range of privacy budgets from strict (<Math math="\varepsilon = 0.01" />) to more relaxed (<Math math="\varepsilon = 10" />) settings.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Imbalance Ratio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700">
                      Evaluated on balanced (ratio=1) to highly imbalanced (ratio=100) datasets.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Encoder</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700">
                      Tested with ViT-H-14, ViT-L-16, ViT-B-16, and ResNet-50.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Dataset</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700">
                      Tested on CIFAR-10, CIFAR-100, STL10, and Food-101.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </section>
        
        <Separator className="my-8" />
        
        <section className="mb-12">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-3xl">Key Findings</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="mb-4 mt-2 text-2xl font-semibold">Dramatic Improvements for Underrepresented Classes</h3>
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
              
              <Separator className="my-8" />
              
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
              
              <Separator className="my-8" />
              
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
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}