import { IconType } from "react-icons";
import { Course } from "linkWithBackend/interfaces/TendonType";
import {Node} from "linkWithBackend/interfaces/TendonType";

export type acheivementProps = {
    id: number,
    title: string,
    thumbnail: string,
};

export type activityProps = {
    id: number,
    day: number,
    month: number,
    year: number,
    isActive: boolean,
};

export enum modeType {
    'main'='main',
    'search'= 'search',
    'resume'= 'resume',
}
export interface NavigateProps {
    Icon: IconType,
    direction: string,
    onClick: () => void,
}

export enum StatusType {
    'COMPLETED' = 'COMPLETED', 
    'INPROGRESS'=  'INPROGRESS',
    'NOTSTARTED' = 'NOTSTARTED',
}

export type LearningLessonNodeProps = {                 // *
    lessonId: string
    lessonName: string
    status: StatusType
    next?: LearningLessonNodeProps[]
}

export interface RenderLearningLessonNodeProps {            // *     
    lessonId: string
    lessonName: string
    status: StatusType
    next?: RenderLearningLessonNodeProps[]
    setChildReady: (value: boolean) => void
    isRender: boolean
}

export type resSource = {
    resLink: string
    resType: string
}



export interface NodeWithProgress extends Node {
    progress: number
}

export interface CourseWithProgress extends Course {
    progress: number
}


// export type Node = {
//     id: string
//     name: string
//     type: "pdfNode" | "videoNode" | "textNode" | "soundNode" | "imageNode"
//     attributes: {
//         priority: "require" | "extension" | "optional";
//         size: number;
//         /** @example "/resources/pdf/1234" */
//         resources: string;
//     };
// }