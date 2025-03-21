import Link from "next/link";
import Image from "next/image";
import Math from "@/components/Math";
import Demo from "@/components/Demo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <section className="mb-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
              Differentially Private Prototypes for Imbalanced Transfer Learning
            </h1>
            <p className="mb-2 text-lg text-slate-700 font-medium">
              <a href="https://wahdany.eu" className="text-primary underline hover:text-primary/80" target="_blank" rel="noopener noreferrer">Dariush Wahdany</a>, 
              <a href="https://jagielski.github.io/" className="text-primary underline hover:text-primary/80" target="_blank" rel="noopener noreferrer"> Matthew Jagielski</a>, 
              <a href="https://adam-dziedzic.com" className="text-primary underline hover:text-primary/80" target="_blank" rel="noopener noreferrer"> Adam Dziedzic</a>, 
              <a href="https://franziska-boenisch.de" className="text-primary underline hover:text-primary/80" target="_blank" rel="noopener noreferrer"> Franziska Boenisch</a>
            </p>
            <p className="mb-4 text-lg font-semibold">
              <Badge variant="default" className="text-base px-3 py-1">
                AAAI25, Philadelphia
              </Badge>
            </p>
            <p className="mb-8 text-xl text-slate-700">
              A novel approach that provides strong privacy guarantees while maintaining high utility, even with imbalanced datasets and in low-data regimes.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <Button asChild variant="default" size="lg">
                <Link href="/method">
                  Learn the Method
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <a 
                  href="https://arxiv.org/abs/2406.08039"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read on arXiv
                </a>
              </Button>
            </div>
          </div>
        </section>



        <section className="mb-16">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-3xl">Why Privacy in Machine Learning Matters</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-lg text-slate-700">
                Machine learning models are trained on vast amounts of data, often scraped from across the internet. This creates serious privacy concerns:
              </p>
              <ul className="mb-4 list-inside list-disc text-lg text-slate-700">
                <li>Models can memorize training data and leak it during inference</li>
                <li>Personal information can be exposed without consent</li>
                <li>Even seemingly anonymous data can be reconstructed</li>
              </ul>
              <p className="mb-4 text-lg text-slate-700">
                Differential Privacy (DP) offers a mathematical guarantee that individual data points cannot be recovered from a model. However, existing DP methods like DP-SGD come with significant drawbacks.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-3xl">Our Solution: DPPL</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center mb-8">
                <img 
                  src="/images/concept.png"
                  alt="DPPL Method Diagram"
                  className="w-full max-w-2xl object-contain"
                />
              </div>
              <p className="mb-4 text-lg text-slate-700">
                Differentially Private Prototype Learning (DPPL) is a new paradigm that achieves both privacy and fairness in machine learning:
              </p>
              <ul className="mb-4 list-inside list-disc text-lg text-slate-700">
                <li>Leverages publicly pre-trained encoders</li>
                <li>Generates DP prototypes that represent each private class</li>
                <li>Can be obtained from few private data points</li>
                <li>Offers strong privacy guarantees under pure DP</li>
                <li><strong>Treats majority and minority classes equally</strong></li>
                <li><strong>Eliminates bias amplification</strong> inherent in gradient-based methods</li>
              </ul>
              <p className="mb-4 text-lg text-slate-700">
                By using a prototype-based approach rather than gradient-based learning, DPPL naturally avoids the fairness problems of traditional DP methods, while still providing strong privacy guarantees.
              </p>
              <Button asChild variant="link">
                <Link 
                  href="/method" 
                  className="inline-flex items-center text-blue-600 hover:underline"
                >
                  Learn how DPPL works →
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <Demo />
        </section>

        <section className="mb-16">
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl">DPPL-Mean</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-slate-700">
                  Applies private mean estimation to class prototypes, using a naive estimator with careful calibration of privacy noise.
                </p>
                <Button asChild variant="link">
                  <Link 
                    href="/method#dppl-mean" 
                    className="inline-flex items-center text-blue-600 hover:underline"
                  >
                    Learn more →
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl">DPPL-Public</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-slate-700">
                  Identifies prototype candidates from public data, using a private selection mechanism to choose the most representative samples.
                </p>
                <Button asChild variant="link">
                  <Link 
                    href="/method#dppl-public" 
                    className="inline-flex items-center text-blue-600 hover:underline"
                  >
                    Learn more →
                  </Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl">DPPL-Public Top-K</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-slate-700">
                  Extends DPPL-Public by selecting multiple prototypes per class to improve representation and utility.
                </p>
                <Button asChild variant="link">
                  <Link 
                    href="/method#dppl-public-topk" 
                    className="inline-flex items-center text-blue-600 hover:underline"
                  >
                    Learn more →
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-3xl">Key Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 grid gap-6 md:grid-cols-2">
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-xl">Dramatic Fairness Improvements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700">
                      DPPL increases accuracy at <Math math="\varepsilon=1" /> on <strong>minority classes from 0% (DP-SGD) or 3% (DPSGD-Global-Adapt) to 60%</strong> — a <Math math="20\times" /> improvement with no performance degradation for majority classes.
                    </p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-xl">Strong Privacy Guarantees</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700">
                      DPPL provides high-utility predictions even under strong privacy guarantees (<Math math="\varepsilon = 0.1" />) and with pure DP.
                    </p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-xl">Robust to Extreme Imbalance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700">
                      Our methods maintain high performance even with imbalance ratios of 100:1 between the most and least represented classes.
                    </p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-xl">Low Data Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700">
                      DPPL works with very few private data points per class, making it suitable for low-data regimes where traditional methods fail.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xl">Privacy and Fairness Together</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-lg text-slate-700">
                    DPPL demonstrates that privacy and fairness can coexist in machine learning systems without sacrificing model utility. By using prototype-based learning with carefully designed privacy mechanisms, we ensure fair performance across all demographic groups, even highly underrepresented ones.
                  </p>
                  <p className="text-lg text-slate-700">
                    As AI continues to shape society, approaches like DPPL are essential for ensuring that technological progress benefits everyone equally while respecting fundamental rights to privacy.
                  </p>
                </CardContent>
              </Card>
              
              {/* <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xl">See detailed results</CardTitle>
                </CardHeader>
                <CardContent> */}
                  <Button asChild variant="link">
                    <Link 
                      href="/results" 
                      className="inline-flex items-center text-blue-600 hover:underline"
                    >
                      See detailed results →
                    </Link>
                  </Button>
                {/* </CardContent>
              </Card> */}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
