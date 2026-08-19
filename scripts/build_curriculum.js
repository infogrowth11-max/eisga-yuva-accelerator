const fs = require('fs');
const path = require('path');

const levelData = [
  { level: 1, name: "Level 1: AI Foundations & Computational Python", price: 999, originalPrice: 2999, tagline: "High-Performance Python, Vectorized NumPy, and Linear Algebra", weeks: [1, 2], color: "#3b82f6", badge: "Foundations" },
  { level: 2, name: "Level 2: Deep Learning & Neural Vision", price: 1299, originalPrice: 3499, tagline: "PyTorch Architecture, Convolutional Networks & Vision Transformers", weeks: [3, 4], color: "#8b5cf6", badge: "Vision & PyTorch" },
  { level: 3, name: "Level 3: NLP & Modern Transformer Architectures", price: 1499, originalPrice: 3999, tagline: "Attention Mechanisms, Tokenization, BERT & GPT Decoders", weeks: [5, 6], color: "#ec4899", badge: "NLP & Attention" },
  { level: 4, name: "Level 4: Generative AI, RAG Systems & Autonomous Agents", price: 1699, originalPrice: 4499, tagline: "LangChain, LangGraph, Vector Embeddings & Multi-Agent Workflows", weeks: [7, 8, 9], color: "#f59e0b", badge: "GenAI & RAG" },
  { level: 5, name: "Level 5: Enterprise LLM Deployment, Fine-Tuning & Production Capstone", price: 1999, originalPrice: 4999, tagline: "LoRA/QLoRA Fine-tuning, vLLM Inference Serving, Guardrails & Capstone", weeks: [10, 11, 12], color: "#10b981", badge: "Enterprise AI" }
];

const moduleMeta = [
  { week: 1, level: 1, title: "Week 1: High-Performance Python & Vectorized Computing for AI", duration: 14, topic: "NumPy Vectorization, Strides & Memory Layouts" },
  { week: 2, level: 1, title: "Week 2: Advanced Feature Engineering & Mathematical Optimization", duration: 16, topic: "Gradient Descent, Adam, Hessians & Feature Pipelines" },
  { week: 3, level: 2, title: "Week 3: Deep Neural Networks & Autograd Foundations in PyTorch", duration: 15, topic: "Computation Graphs, Autograd, Mixed Precision AMP & CUDA Memory" },
  { week: 4, level: 2, title: "Week 4: Convolutional Networks, ResNets & Vision Transformers", duration: 18, topic: "ResNet Residuals, Patch Embeddings & ViT Multi-Head Attention" },
  { week: 5, level: 3, title: "Week 5: NLP & Modern Tokenization Algorithms", duration: 15, topic: "Byte-level BPE, SentencePiece, Scaled Dot-Product & Bahdanau Attention" },
  { week: 6, level: 3, title: "Week 6: Transformer Architectures: BERT, GPT & FlashAttention", duration: 16, topic: "Rotary Embeddings (RoPE), RMSNorm, Causal Masking & FlashAttention SRAM Tiling" },
  { week: 7, level: 4, title: "Week 7: Vector Databases, Dense Embeddings & Semantic Search", duration: 15, topic: "HNSW Graph Indexing, IVF-PQ Quantization & Hybrid Reciprocal Rank Fusion" },
  { week: 8, level: 4, title: "Week 8: Advanced Retrieval-Augmented Generation (RAG) Architectures", duration: 16, topic: "HyDE Query Transformation, Cross-Encoder Re-Ranking & RAG Triad Evaluation" },
  { week: 9, level: 4, title: "Week 9: Autonomous Multi-Agent Workflows & LangGraph Orchestration", duration: 18, topic: "LangGraph StateGraph, Tool Calling, Reducers & Human-in-the-Loop Approval" },
  { week: 10, level: 5, title: "Week 10: Parameter-Efficient Fine-Tuning (PEFT): LoRA & QLoRA", duration: 16, topic: "Low-Rank Adaptation (LoRA), 4-bit NF4 Quantization & Instruction Tuning" },
  { week: 11, level: 5, title: "Week 11: High-Throughput Inference Serving: vLLM & PagedAttention", duration: 16, topic: "PagedAttention Virtual Memory, Continuous Batching & Speculative Decoding" },
  { week: 12, level: 5, title: "Week 12: Production Capstone: Autonomous Enterprise AI System & Defense", duration: 24, topic: "End-to-End GenAI Architecture, Prompt Defense, NeMo Guardrails & Capstone Defense" }
];

const videos = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
];

function buildModule(m) {
  const v1 = videos[(m.week * 2) % videos.length];
  const v2 = videos[(m.week * 2 + 1) % videos.length];
  const v3 = videos[(m.week * 2 + 2) % videos.length];

  return {
    week: m.week,
    level: m.level,
    title: m.title,
    slug: "week-" + m.week + "-curriculum",
    durationHours: m.duration,
    overview: "Master deep technical concepts in " + m.topic + " with hands-on enterprise code implementations.",
    outcomes: [
      "Deep understanding of " + m.topic + " mathematical foundations and industry best practices",
      "Production-grade implementation with profiling, test coverage, and GPU optimization",
      "Real-world enterprise system patterns and edge-case handling",
      "Passing the Week " + m.week + " Technical Certification Examination"
    ],
    lessons: [
      {
        id: "l" + m.week + "-1",
        title: "Theoretical Foundations & Mathematical Mechanics: " + m.topic.split(",")[0],
        duration: "48 mins",
        videoUrl: v1,
        notes: "Detailed examination of core mechanics, architectural diagrams, memory patterns, and algorithmic complexity.",
        codeSnippet: "# Enterprise implementation pattern for " + m.topic.split(",")[0] + "\nimport sys\nprint('Initializing module: " + m.title + "')\n"
      },
      {
        id: "l" + m.week + "-2",
        title: "Hands-on Implementation & Performance Optimization",
        duration: "52 mins",
        videoUrl: v2,
        notes: "Step-by-step code implementation with performance profiling, cache utilization, and error handling.",
        codeSnippet: "# Optimized pipeline\ndef execute_accelerator():\n    print('Executing accelerated pipeline for Week " + m.week + "')\n    return {'status': 'success', 'week': " + m.week + "}"
      },
      {
        id: "l" + m.week + "-3",
        title: "Enterprise Architecture, Scaling & Capstone Lab",
        duration: "40 mins",
        videoUrl: v3,
        notes: "Integrating into distributed enterprise pipelines, telemetry monitoring, and assessment review.",
        codeSnippet: "# Production integration\nclass EnterprisePipeline:\n    def __init__(self):\n        self.week = " + m.week + "\n        self.active = True"
      }
    ],
    quiz: {
      id: "quiz-w" + m.week,
      week: m.week,
      title: "Week " + m.week + " Certification Assessment: " + m.title.split(": ")[1],
      passingScore: 60,
      timeLimitMinutes: 15,
      questions: [
        {
          id: "q" + m.week + "-1",
          question: "What is the primary architectural principle governing " + m.topic.split(",")[0] + " in enterprise AI workloads?",
          options: [
            "Maximizing hardware compute efficiency and minimizing memory I/O bottlenecks",
            "Disabling floating point operations",
            "Converting all algorithms to recursive single-threaded Python loops",
            "Encrypting model weights in RAM"
          ],
          correctIndex: 0,
          explanation: "Enterprise AI architectures prioritize memory bandwidth utilization (e.g. SRAM tiling, vectorization) to eliminate I/O stalls."
        },
        {
          id: "q" + m.week + "-2",
          question: "When scaling " + m.title.split(": ")[1] + ", which evaluation metric is most critical for production reliability?",
          options: [
            "Precision / Recall grounding and P95 latency guarantees",
            "Total number of lines in the Python codebase",
            "CSS animation frame rate",
            "Number of comments in the code"
          ],
          correctIndex: 0,
          explanation: "In production AI systems, accuracy/grounding combined with strict P95/P99 latency SLA defines system reliability."
        },
        {
          id: "q" + m.week + "-3",
          question: "What is the consequence of failing to validate input tensor dimensions or schema constraints?",
          options: [
            "Silent dimensional broadcasting mismatches or unhandled runtime exceptions in forward pass",
            "Immediate hardware destruction",
            "The model automatically converts to Java",
            "Learning rate doubles every millisecond"
          ],
          correctIndex: 0,
          explanation: "Mismatched dimensions can either crash at runtime or silently broadcast incorrectly, producing erroneous silent output."
        },
        {
          id: "q" + m.week + "-4",
          question: "Which optimization technique yields the highest throughput gain for this module's workload?",
          options: [
            "Batch vectorization, memory pinning, and fused kernel operations",
            "Writing nested for-loops with sleep delays",
            "Using 128-bit quadruple precision for all tensors",
            "Running only on single core virtual CPUs"
          ],
          correctIndex: 0,
          explanation: "Vectorization and kernel fusion maximize arithmetic intensity and minimize memory transfer overhead."
        },
        {
          id: "q" + m.week + "-5",
          question: "What score threshold is mandated by the EISGA YUVA 2-Factor Drip Feed Engine to unlock subsequent weeks?",
          options: [
            "A minimum passing score of 60% on the weekly certification assessment",
            "20% score",
            "100% score only with zero errors",
            "No quiz is required"
          ],
          correctIndex: 0,
          explanation: "The Progression Rule strictly enforces >= 60% passing score on Week X-1 quiz along with the 7-day time lock."
        }
      ]
    }
  };
}

const fullCurriculum = {
  bootcamp: {
    id: "eisga-yuva-ai-accelerator",
    title: "EISGA YUVA AI Accelerator",
    subtitle: "India's Premier Enterprise AI & Generative AI Mastery Fellowship",
    totalWeeks: 12,
    totalLevels: 5,
    levels: levelData,
    modules: moduleMeta.map(buildModule)
  }
};

const target = path.join(__dirname, '..', 'public', 'data', 'master_bootcamp_curriculum.json');
fs.writeFileSync(target, JSON.stringify(fullCurriculum, null, 2), 'utf8');
console.log('Successfully written master curriculum to:', target);