import Link from "next/link";
import Image from "next/image";
import Math from "@/components/Math";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
            Differentially Private Prototypes for Imbalanced Transfer Learning
          </h1>
          <p className="mb-2 text-lg text-slate-700 font-medium">
            <a href="https://wahdany.eu" className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer">Dariush Wahdany</a>, 
            <a href="https://jagielski.github.io/" className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer"> Matthew Jagielski</a>, 
            <a href="https://adam-dziedzic.com" className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer"> Adam Dziedzic</a>, 
            <a href="https://franziska-boenisch.de" className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer"> Franziska Boenisch</a>
          </p>
          <p className="mb-4 text-lg text-blue-600 font-semibold">
            Presented at AAAI25, the 39th Annual AAAI Conference on Artificial Intelligence, Philadelphia
          </p>
          <p className="mb-8 text-xl text-slate-700">
            A novel approach that provides strong privacy guarantees while maintaining high utility, even with imbalanced datasets and in low-data regimes.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Link 
              href="/method" 
              className="rounded-md bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
            >
              Learn the Method
            </Link>
            <a 
              href="https://arxiv.org/abs/2406.08039"
              className="rounded-md bg-red-700 px-5 py-2.5 text-white hover:bg-red-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read on arXiv
            </a>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="rounded-xl bg-white p-8 shadow-md">
          <h2 className="mb-6 text-3xl font-bold">Why Privacy in Machine Learning Matters</h2>
          <div className="mb-6">
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
          </div>
          
          <h3 className="mb-4 text-2xl font-semibold">The Double Challenge: Privacy and Fairness</h3>
          <div className="grid gap-8 ">
            <div>
              <p className="mb-4 text-lg text-slate-700">
                Current DP methods struggle with:
              </p>
              <ul className="mb-4 list-inside list-disc text-lg text-slate-700">
                <li>High privacy regimes (<Math math="\varepsilon < 0.1" />)</li>
                <li>Low data scenarios</li>
                <li>Imbalanced training datasets</li>
              </ul>
              <p className="mb-4 text-lg text-slate-700">
                Worse yet, they actually <strong>amplify biases</strong> against minority groups. This happens because:
              </p>
              <ul className="mb-4 list-inside list-disc text-lg text-slate-700">
                <li>Gradients for minority classes tend to be larger</li>
                <li>Larger gradients get clipped more severely</li>
                <li>This systematically diminishes the influence of minority data</li>
              </ul>
            </div>
            {/* <div className="flex items-center justify-center">
              <img 
                src="/images/bias-1.png"
                alt="Bias Amplification in DP-SGD"
                className="max-h-64 object-contain w-full max-w-lg rounded-lg border border-slate-200"
              />
            </div> */}
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="rounded-xl bg-white p-8 shadow-md">
          <h2 className="mb-6 text-3xl font-bold">Our Solution: DPPL</h2>
          <div className="flex items-center justify-center mb-8">
            <img 
              src="/images/concept.png"
              alt="DPPL Method Diagram"
              className="w-full max-w-2xl object-contain"
            />
          </div>
          <div>
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
            <Link 
              href="/method" 
              className="inline-flex items-center text-blue-600 hover:underline"
            >
              Learn how DPPL works →
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h3 className="mb-4 text-xl font-bold">DPPL-Mean</h3>
            <p className="mb-4 text-slate-700">
              Applies private mean estimation to class prototypes, using a naive estimator with careful calibration of privacy noise.
            </p>
            <Link 
              href="/method#dppl-mean" 
              className="inline-flex items-center text-blue-600 hover:underline"
            >
              Learn more →
            </Link>
          </div>
          
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h3 className="mb-4 text-xl font-bold">DPPL-Public</h3>
            <p className="mb-4 text-slate-700">
              Identifies prototype candidates from public data, using a private selection mechanism to choose the most representative samples.
            </p>
            <Link 
              href="/method#dppl-public" 
              className="inline-flex items-center text-blue-600 hover:underline"
            >
              Learn more →
            </Link>
          </div>
          
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h3 className="mb-4 text-xl font-bold">DPPL-Public Top-K</h3>
            <p className="mb-4 text-slate-700">
              Extends DPPL-Public by selecting multiple prototypes per class to improve representation and utility.
            </p>
            <Link 
              href="/method#dppl-public-topk" 
              className="inline-flex items-center text-blue-600 hover:underline"
            >
              Learn more →
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="rounded-xl bg-white p-8 shadow-md">
          <h2 className="mb-6 text-3xl font-bold">Key Results</h2>
          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-slate-100 p-4">
              <h3 className="mb-2 text-xl font-bold">Dramatic Fairness Improvements</h3>
              <p className="text-slate-700">
                DPPL increases accuracy at <Math math="\varepsilon=1" /> on <strong>minority classes from 0% (DP-SGD) or 3% (DPSGD-Global-Adapt) to 60%</strong> — a <Math math="20\times" /> improvement with no performance degradation for majority classes.
              </p>
            </div>
            <div className="rounded-lg bg-slate-100 p-4">
              <h3 className="mb-2 text-xl font-bold">Strong Privacy Guarantees</h3>
              <p className="text-slate-700">
                DPPL provides high-utility predictions even under strong privacy guarantees (<Math math="\varepsilon = 0.1" />) and with pure DP.
              </p>
            </div>
            <div className="rounded-lg bg-slate-100 p-4">
              <h3 className="mb-2 text-xl font-bold">Robust to Extreme Imbalance</h3>
              <p className="text-slate-700">
                Our methods maintain high performance even with imbalance ratios of 100:1 between the most and least represented classes.
              </p>
            </div>
            <div className="rounded-lg bg-slate-100 p-4">
              <h3 className="mb-2 text-xl font-bold">Low Data Requirements</h3>
              <p className="text-slate-700">
                DPPL works with very few private data points per class, making it suitable for low-data regimes where traditional methods fail.
              </p>
            </div>
          </div>
          
          <div className="mt-8 rounded-lg bg-blue-50 p-6 border border-blue-200">
            <h3 className="mb-4 text-xl font-bold text-blue-800">Privacy and Fairness Together</h3>
            <p className="mb-4 text-lg text-slate-700">
              DPPL demonstrates that privacy and fairness can coexist in machine learning systems without sacrificing model utility. By using prototype-based learning with carefully designed privacy mechanisms, we ensure fair performance across all demographic groups, even highly underrepresented ones.
            </p>
            <p className="text-lg text-slate-700">
              As AI continues to shape society, approaches like DPPL are essential for ensuring that technological progress benefits everyone equally while respecting fundamental rights to privacy.
            </p>
          </div>
          
          <div className="mt-6">
            <Link 
              href="/results" 
              className="inline-flex items-center text-blue-600 hover:underline"
            >
              See detailed results →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
