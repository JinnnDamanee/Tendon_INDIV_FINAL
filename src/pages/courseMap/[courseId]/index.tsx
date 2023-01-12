import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import LoadingSpinner from "@components/baseComponents/LoadingSpinner";
import MainLayout from "@components/Layout/MainLayout";
import { MockRelateCourse } from "@data/graphNode";
import { LearningLessonNodeProps, StatusType } from "@customTypes/index";
import { useBreadCrumb } from "context/breadCrumb";
import useLocalStorage from "hooks/useLocalStorage";
import useNavPath from "hooks/useNavPath";

const CourseMap = dynamic(() => import("@components/curriculaMap"));

// Fetch Curriculum Data
// const getCurriculaNodeData = (courseId: string): LearningLessonNodeProps => {
//     return {
//         lessonId: courseId,
//         lessonName: "Introduction to Programming",
//         status: StatusType.COMPLETED,
//         next: MockRelateCourse
//     }
// }

const CoursePage = () => {
    const router = useRouter();
    const courseParam = router.query.courseId ? router.query.courseId.toString() : "";
    var splitted = courseParam.split("*", ); 
    // console.log(splitted)
    var courseId = ""
    var courseName = ""
    if (splitted[1] !== undefined) {
        courseName = splitted[1]
    }
    if (splitted[0] !== undefined) {
        courseId = splitted[0]
    }
    // const curriculaData = getCurriculaNodeData(courseId);
    const { pathList, setPathList } = useBreadCrumb()
    const [storedPath, setStoredPath] = useLocalStorage('path', pathList);

    // useNavPath({
    //     page: 'CurriculaNode',
    //     curriculaData: curriculaData,
    //     courseId: courseId
    // })

    useEffect(() => {
        setPathList([
            {
                name: 'Dashboard',
                link: '/',
            },
            {
                name: courseName,
                link: `/courseMap/${courseId}`,
            }
        ])
        setStoredPath(pathList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        // <BreadcrumbProvider>
        <MainLayout>
            <Suspense fallback={<LoadingSpinner />}>
                <CourseMap learningNodeData={ courseId } />
            </Suspense>
        </MainLayout>
        // </BreadcrumbProvider>
    )
}
export default CoursePage;