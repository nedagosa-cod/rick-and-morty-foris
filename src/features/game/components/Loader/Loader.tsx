import './loader.css';

interface LoaderProps {
    text?: string;
    className?: string;
}

export default function Loader({ text, className }: LoaderProps) {
    return (
        <div className="container">
            <div className={`portal ${className}`}></div>
            {text && <p>{text}</p>}
        </div>
    )
}
