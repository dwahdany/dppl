import Math from '@/components/Math';

export default function MethodPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-4xl font-bold">Method: Differentially Private Prototype Learning</h1>
        <p className="mb-8 text-lg text-blue-600 font-semibold">
          Presented at AAAI25, the 39th Annual AAAI Conference on Artificial Intelligence, Philadelphia
        </p>
        
        <section className="mb-12">
          <div className="rounded-xl bg-white p-8 shadow-md">
            <h2 className="mb-6 text-3xl font-bold">Overview</h2>
            <p className="mb-4 text-lg text-slate-700">
              Differentially Private Prototype Learning (DPPL) is a new paradigm for private transfer learning that addresses limitations of traditional approaches like DP-SGD, especially in high privacy, low data, and imbalanced data scenarios.
            </p>
            <p className="mb-4 text-lg text-slate-700">
              The key insight of DPPL is to leverage publicly pre-trained encoders to extract features from private data and generate differentially private prototypes that represent each private class in the embedding space.
            </p>
            <div className="my-8 flex justify-center">
              <img 
                src="/images/concept.png"
                alt="DPPL Method Diagram"
                className="max-h-80 object-contain w-full max-w-2xl rounded-lg"
              />
            </div>
            <p className="mb-4 text-lg text-slate-700">
              These DP prototypes can be publicly released for inference while maintaining strong privacy guarantees, even under the notion of pure DP. The approach is particularly powerful as it can generate high-quality prototypes from just a few private training data points without requiring iterative noise addition.
            </p>
            
            <h3 className="mb-4 mt-8 text-2xl font-semibold">The Privacy-Fairness Dilemma</h3>
            <p className="mb-4 text-lg text-slate-700">
              Traditional differentially private machine learning methods face a fundamental challenge when dealing with imbalanced datasets. The standard approach, DP-SGD, adds noise to gradient updates during training. However, this process disproportionately affects underrepresented groups:
            </p>
            <div className="grid gap-8">
              <div>
                <ul className="mb-4 list-disc space-y-2 pl-6 text-lg text-slate-700">
                  <li><strong>Different gradient directions:</strong> Minority data points often point in different directions than majority data</li>
                  <li><strong>Larger minority gradients:</strong> With fewer examples of minority groups, the model makes bigger errors on these points, leading to larger gradients</li>
                  <li><strong>Disproportionate clipping:</strong> When we clip gradients for privacy, minority gradients get clipped more often, systematically rotating the overall gradient toward the majority group</li>
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
            <p className="mt-4 text-lg text-slate-700">
              DPPL addresses this bias amplification problem with a prototype-based approach that treats majority and minority classes equally, ensuring both privacy and fairness.
            </p>
          </div>
        </section>
        
        <section id="dppl-mean" className="mb-12 scroll-mt-20">
          <div className="rounded-xl bg-white p-8 shadow-md">
            <h2 className="mb-6 text-3xl font-bold">DPPL-Mean</h2>
            <p className="mb-4 text-lg text-slate-700">
              DPPL-Mean takes the most direct approach to creating private prototypes. After extracting features from private data using a pre-trained encoder, it computes a differentially private mean for each class.
            </p>
            
            <h3 className="mb-4 mt-8 text-2xl font-semibold">Algorithm</h3>
            <ol className="mb-6 list-decimal space-y-2 pl-6 text-lg text-slate-700">
              <li>Extract features from private data using a pre-trained encoder</li>
              <li>Apply optional average pooling to reduce dimensionality</li>
              <li>For each class, compute a differentially private mean using the naive estimator:
                <ul className="mt-2 list-disc pl-6">
                  <li>Clip each feature vector to control sensitivity</li>
                  <li>Compute the mean of the clipped vectors</li>
                  <li>Add calibrated noise to achieve differential privacy</li>
                </ul>
              </li>
              <li>Use the resulting class prototypes for classification</li>
            </ol>
            
            <h3 className="mb-4 mt-8 text-2xl font-semibold">Mathematical Details</h3>
            <div className="mb-6 rounded-lg bg-slate-100 p-4 font-mono">
              <p className="mb-2">1. Feature extraction: <Math math="X = \text{Encoder}(\text{private\_data})" /></p>
              <p className="mb-2">2. For each class c:</p>
              <p className="mb-2">   a. <Math math="X_c = \{x_i \in X | y_i = c\}" /></p>
              <p className="mb-2">   b. Optional: Apply average pooling with k_pool to reduce dimensionality</p>
              <p className="mb-2">   c. Clipping: <Math math="X_c^{\text{clipped}} = \text{clip}_{\ell_2}(X_c, r)" /></p>
              <p className="mb-2">   d. Compute DP mean: <Math math="p_c = \mathcal{N}(0, 2r^2/n_c^2\rho) + \frac{1}{n_c} \sum(X_c^{\text{clipped}})" /></p>
            </div>
            
            <p className="text-lg text-slate-700">
              This method provides a privacy guarantee of ρ-zCDP per class. The clipping parameter r controls the sensitivity, and the privacy cost is ρ for the entire private dataset due to parallel composition across classes.
            </p>
          </div>
        </section>
        
        <section id="dppl-public" className="mb-12 scroll-mt-20">
          <div className="rounded-xl bg-white p-8 shadow-md">
            <h2 className="mb-6 text-3xl font-bold">DPPL-Public</h2>
            <p className="mb-4 text-lg text-slate-700">
              DPPL-Public leverages public data beyond pre-training the encoder. Instead of generating synthetic prototypes, it privately selects the most representative samples from the public dataset to serve as prototypes for each private class.
            </p>
            
            <h3 className="mb-4 mt-8 text-2xl font-semibold">Algorithm</h3>
            <ol className="mb-6 list-decimal space-y-2 pl-6 text-lg text-slate-700">
              <li>Extract features from both private and public data using the same pre-trained encoder</li>
              <li>For each class in the private data, calculate a score for each public sample:
                <ul className="mt-2 list-disc pl-6">
                  <li>Compute the cosine similarity between the public sample and each private sample in the class</li>
                  <li>Clip the similarities to control sensitivity</li>
                  <li>Sum the clipped similarities to get an overall score</li>
                </ul>
              </li>
              <li>Use the exponential mechanism to privately select a public sample as the prototype for each class</li>
              <li>Use the selected public samples as prototypes for classification</li>
            </ol>
            
            <h3 className="mb-4 mt-8 text-2xl font-semibold">Mathematical Details</h3>
            <div className="mb-6 rounded-lg bg-slate-100 p-4 font-mono">
              <p className="mb-2">1. Feature extraction:</p>
              <p className="mb-2">   <Math math="E = \text{Encoder}(\text{private\_data})" /></p>
              <p className="mb-2">   <Math math="\hat{E} = \text{Encoder}(\text{public\_data})" /></p>
              <p className="mb-2">2. For each class c:</p>
              <p className="mb-2">   a. <Math math="E_c = \{e_i \in E | y_i = c\}" /></p>
              <p className="mb-2">   b. For each public sample <Math math="\hat{x}" />:</p>
              <p className="mb-2">      <Math math="u(\hat{x},c) = \sum(1 + \text{cos\_sim}(e, \hat{e}))" /></p>
              <p className="mb-2">      <Math math="u_{\text{clipped}} = \text{clip}(u, d_{\min}, d_{\max})" /></p>
              <p className="mb-2">   c. Select prototype: <Math math="p_c \propto \exp(\varepsilon u_{\text{clipped}}/(d_{\max} - d_{\min}))" /></p>
            </div>
            
            <p className="text-lg text-slate-700">
              This method provides ε-DP guarantees through the exponential mechanism. The utility function is positively monotonic with respect to the private data, and parallel composition applies across classes. The sensitivity is controlled by the clipping parameters d_min and d_max.
            </p>
          </div>
        </section>
        
        <section id="dppl-public-topk" className="scroll-mt-20">
          <div className="rounded-xl bg-white p-8 shadow-md">
            <h2 className="mb-6 text-3xl font-bold">DPPL-Public Top-K</h2>
            <p className="mb-4 text-lg text-slate-700">
              DPPL-Public Top-K extends DPPL-Public by selecting multiple (K) prototypes per class instead of just one. This enhances the representation capability, particularly for classes with multimodal distributions or high intra-class variability.
            </p>
            
            <h3 className="mb-4 mt-8 text-2xl font-semibold">Algorithm</h3>
            <ol className="mb-6 list-decimal space-y-2 pl-6 text-lg text-slate-700">
              <li>Calculate scores for public samples as in DPPL-Public</li>
              <li>Sort public samples by their scores in descending order</li>
              <li>Use a private top-K selection mechanism to select K prototypes:
                <ul className="mt-2 list-disc pl-6">
                  <li>Privately select one prototype using the exponential mechanism</li>
                  <li>Uniformly sample the remaining K-1 prototypes from those with higher utility than the sampled one</li>
                </ul>
              </li>
              <li>Use all selected prototypes for classification</li>
            </ol>
            
            <h3 className="mb-4 mt-8 text-2xl font-semibold">Mathematical Details</h3>
            <div className="mb-6 rounded-lg bg-slate-100 p-4 font-mono">
              <p className="mb-2">1. Calculate scores as in DPPL-Public</p>
              <p className="mb-2">2. For each class c:</p>
              <p className="mb-2">   a. Sort public samples by score: <Math math="C = \text{sort}(X_{\text{public}}, \text{key=score}, \text{descending=True})" /></p>
              <p className="mb-2">   b. Define utility U as: <Math math="U = C - C[k-1]" /> (utility of top-k elements)</p>
              <p className="mb-2">   c. Use exponential mechanism to sample one utility value</p>
              <p>   d. Uniformly sample remaining K-1 prototypes with higher or equal utility</p>
            </div>
            
            <p className="text-lg text-slate-700">
              DPPL-Public Top-K often achieves better performance than both DPPL-Mean and DPPL-Public, especially at less strict privacy regimes where more prototypes can be selected per class without compromising privacy.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}