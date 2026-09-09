export const objectiveStatement = `Quantitative data engineer focused on reliable market-data, research, and risk systems. I build reproducible pipelines and analytical stores with Python, SQL, Kafka, PostgreSQL, Parquet, and cloud tooling, with an emphasis on data quality, traceability, and practical performance.
Open to hands-on quant data engineering roles in India and globally, where disciplined research infrastructure and sound engineering matter.`;

export const contactIconKeys = ['phone', 'email', 'location', 'github', 'linkedin'] as const;

export type ContactIconKey = (typeof contactIconKeys)[number];

export type ContactDetail = {
	label: string;
	value: string;
	icon: ContactIconKey;
	href?: string;
	target?: '_blank';
};

export const contactDetails = [
	{ icon: 'phone', label: 'Phone', value: '+91-9301990411', href: 'tel:+919301990411' },
	{ icon: 'email', label: 'Email', value: 'Prathamjain3903@gmail.com', href: 'mailto:Prathamjain3903@gmail.com' },
	{ icon: 'location', label: 'Location', value: 'Gurugram, India' },
	{ icon: 'github', label: 'GitHub', value: 'Pratham-Jain-3903', href: 'https://github.com/Pratham-Jain-3903', target: '_blank' },
	{ icon: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/pratham-jain-56682620a/', href: 'https://www.linkedin.com/in/pratham-jain-56682620a/', target: '_blank' },
] satisfies readonly ContactDetail[];