import { Metadata } from "next";
import Planning from './planning';

export const metadata: Metadata = {
    title: 'CL Alpha - Planning',
    description: 'Planning des activités des Alphas',
}

const PlanningPage: React.FC = ({ }) => {
    return <div className="main-content">
        <h1>Notre planning</h1>
        <Planning />
    </div>
}

export default PlanningPage;