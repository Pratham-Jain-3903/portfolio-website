import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Calendar, Users } from 'lucide-react';

interface ProjectEntry {
  title: string;
  duration?: string;
  description: string;
  otherCreators?: string[];
}

const projectData: ProjectEntry[] = [
  {
    title: 'SolarWise: Dynamic AI-Driven Energy Management Cloud Solutions',
    duration: 'Oct 2024',
    description: 'SolarWise is the winning entry prepared for Luminous TechnoX Hackathon 2024, it leverages IoT devices for real-time monitoring of solar power generation, battery levels, and energy savings while integrating Time-of-Use (TOU) tariff data for cost-aware decision-making.\n\n- The system achieves 95% precision in anomaly detection and provides AI-powered predictions using lightweight Linear Regression models with R² > 90% for user consumption forecasting and LSTM models with 92% accuracy for TOU tariff predictions.\n\n-Smart scheduling is powered by Mixed-Integer Linear Programming (MILP), ensuring 100% optimal energy usage, supported by Z-Score-based anomaly detection with over 95% precision.\n\n-The tech stack includes AWS IoT Core and Kinesis for real-time data streaming, Amazon S3, DynamoDB, and Aurora for storage, and analytics powered by AWS Athena and OpenSearch. Stream processing with Amazon EKS and real-time dashboards via Grafana, integrated with PostgreSQL and Neon Databases, enable efficient visualization. With metrics like 99.5% uptime, adaptive scheduling, and AI models optimized for accuracy, SolarWise delivers a robust, scalable, and user-centric energy management solution.Show less',
    otherCreators: ['Krishna Faujdar', 'Manvendra Singh', 'Pavan Kumar'],
  },
  {
    title: 'Flipkart_Grid_6.0 - Smart Grocery Scanner Application',
    duration: 'Sep 2024',
    description: 'Real-time Product Detection: Automated scanning and recognition of products using computer vision\nOne-Click Interface: User-friendly for warehouse staff, allowing quick switching between automatic and manual modes\nUser Alerts: Real-time notifications for incorrect, missing, extra, or expired products in orders\nSmart Inventory Management: Tracks product movement and updates inventory in real-time\nFreshness Detection: AI-powered OCR-based assessment for perishable goods and expiration detection for packaged products\nScalability: Efficient deployment across all product categories with minimal hardware upgrades\nHybrid Cloud-Edge Model: Uses low-cost edge devices for real-time inference and cloud for centralized logging and analytics\nLogging System: Continuous logging of order and item data, helping identify frequently mis-scanned products\nUser-Friendly Interface: Modern dark-themed UI built with CustomTkinter for ease of useShow less',
    otherCreators: ['Ashutosh Singh', 'Prathamesh Patil'],
  },
  {
    title: 'AI-Driven HVAC Efficiency Optimization | Bosch Global Software Technologies',
    duration: 'Mar 2024',
    description: '—Designed and implemented robust, real-time data pipelines to collect, process, and analyze IoT data for energy optimization.\n\n—Engineered scalable data ingestion frameworks, processing 30 days of continuous IoT signals to ensure seamless data flow and minimal latency.\n\n—Utilized distributed computing and data engineering tools (e.g., Apache Spark, Kafka) to handle large-scale data and optimize HVAC system efficiency.\n\n—Applied advanced data transformation and storage techniques to support AI-driven insights and real-time decision-making.Show less',
    otherCreators: ['Anandan Arumugam', 'Vipin Pulikkal'],
  },
  {
    title: 'An Open-Source Framework for Breast Cancer Diagnosis leveraging Pathology, Radiology, and Medical History | Bosch Global Software Technologies',
    duration: 'Jan 2024',
    description: '- Spearheaded an AI-driven breast cancer screening initiative, achieving 97% diagnostic accuracy using FNAC data.\n\n- Collected and curated first-party medical datasets, including radiology and histopathology images, in collaboration with industry mentors and medical professionals.\n\n- Developed and fine-tuned multiple AI models for detecting masses, lesions, and calcifications, as well as conducting risk assessments using PyCaret, Grad-CAMs, and other advanced techniques.\n\n- Implemented SHAP for model interpretability, ensuring that AI-driven insights are transparent and clinically actionable.\n\n- Reduced second screening time by 80% through the deployment of AI models, validated in real-time on Indian patients.\n\n- Utilized Weights & Biases for model tracking, hyperparameter tuning, and performance monitoring, ensuring robust model development.\n\n- Deployed the system at scale using Streamlit and Docker, ensuring accessibility and scalability across medical institutions.\n\n- Integrated the solution with cloud platforms for seamless data storage, processing, and inference, enabling efficient large-scale operation.\n\n- Collaborated closely with medical institutions and industry experts to ensure the clinical relevance and effectiveness of the AI models, facilitating widespread adoption.Show less',
    otherCreators: ['Jahnvi Tiwari', 'Shruti Jaiswal'],
  },
  {
    title: 'GenAI-Powered Credit Access Platform for MSMEs',
    duration: 'Jan 2024',
    description: 'AI-Driven Financial Assessment: Leverage advanced AI algorithms to evaluate creditworthiness based on cash flow and historical data.\n\nSeamless Integration with OCEN: Ensure efficient data exchange between MSMEs and financial institutions for streamlined loan processing.\n\nDiverse Financing Options: Connect users with a variety of funding sources, including traditional lenders, investors, and government schemes.\n\nUser-Friendly Interface: Create an intuitive platform that promotes financial literacy, making it easier for MSMEs to understand their financing options.\n\nEmpowerment Tools: Provide tools and resources for financial management, helping MSMEs improve their credit profiles.Show less',
  },
  {
    title: 'TrendLoop',
    duration: 'May 2024 - Jun 2024',
    description: 'TRENDLOOP is an AI-powered platform designed to transform the fashion industry by promoting sustainability and enhancing the shopping experience. The frontend, built using Flutter, ensures a seamless and intuitive user interface, while the backend is powered by Firebase, offering robust data management and real-time synchronization.\n\nLeveraging a diverse tech stack that includes Python, TensorFlow, and open-source diffusion models like FLUX.1, TRENDLOOP delivers:\n\nPersonalized Outfit Recommendations: AI algorithms analyze user data to provide tailored fashion suggestions.\nVirtual Clothing Try-Ons: 3D garment rendering enables users to visualize outfits before purchase.\nCircular Fashion Marketplace: A dedicated platform for pre-owned clothing supports sustainable consumption.\nSupport for Ethical Production: Small-scale manufacturers are empowered to encourage fair and eco-friendly practices.\nTRENDLOOP redefines fashion by reducing the environmental impact of fast fashion, fostering circular economy principles, and delivering a personalized, tech-driven shopping experience.Show less',
    otherCreators: ['Rushikesh Muneshwar'],
  },
];

const Projects: React.FC = () => {
  const formatDescription = (description: string) => {
    // Split by newline and filter out empty lines
    const lines = description.split('\n').filter(line => line.trim() !== '');
    
    // Check if it looks like a list (lines starting with -, *, or •)
    const isList = lines.some(line => /^[-\*•—]/.test(line.trim()));

    if (isList) {
      // Render as a list
      return (
        <ul className="list-disc list-inside space-y-2">
          {lines.map((line, index) => (
            <li key={index}>{line.replace(/^[-\*•—]\s*/, '')}</li> // Remove list marker
          ))}
        </ul>
      );
    } else {
      // Render as paragraphs
      return (
        <div className="space-y-2">
          {lines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      );
    }
  };

  return (
    <Card className="w-full shadow-xl rounded-xl overflow-hidden border border-border/50" id="projects">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 pb-6">
        <CardTitle className="text-3xl lg:text-4xl font-bold text-foreground flex items-center">
          <Briefcase className="mr-3 h-8 w-8 text-primary" /> Projects
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 px-6 space-y-8">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
 {projectData.map((project, index) => (
 <div
 key={index}
 className="p-4 border border-border/20 bg-background/10 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
 >
 <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
 {project.duration && (
 <p className="text-sm text-muted-foreground flex items-center mt-1">
 <Calendar className="h-4 w-4 mr-1" /> {project.duration}
 </p>
 )}
 <div className="mt-3 text-sm text-foreground/90">
 {formatDescription(project.description)}
 </div>
 {project.otherCreators && project.otherCreators.length > 0 && (
 <div className="mt-4 text-sm text-muted-foreground flex items-center">
 <Users className="h-4 w-4 mr-1" /> Other creators: {project.otherCreators.join(', ')}
 </div>
 )}
            </div>
 ))}
 </div>
      </CardContent>
    </Card>
  );
};

export default Projects;