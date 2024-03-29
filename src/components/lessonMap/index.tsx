import LoadingSpinner from '@components/baseComponents/LoadingSpinner';
import { motion } from 'framer-motion'
import React, { useEffect, useState } from "react"
import { Xwrapper } from 'react-xarrows';
import LessonNode from './LessonNode';
import ViewModel from './ViewModel';

interface LessonMapProps {
    lid: string
}
// Entire View of the Course Map (Container)
const LessonMap = ({ lid }: LessonMapProps) => {
    const [childReady, setChildReady] = useState(false);
    const [onClient, setOnClient] = useState(false);
    const renderingGraph = ViewModel(lid)

    useEffect(() => {
        setOnClient(true)
    }, [])

    // For preventing SSR on Xarrow
    if (!onClient) {
        return <></>
    }

    if (renderingGraph.length === 0) {
        return <LoadingSpinner />
    }

    // Return Cluster of Course Nodes that call their children recursively 
    return (
        <>
            <motion.main
                className="flex grow items-center justify-center gap-10"
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            >
                {/* HIDE Start Node */}

                <div className="flex flex-col gap-10">
                    <Xwrapper>
                        {
                            renderingGraph.map((item, index) => {
                                return (
                                    <div key={index} className="flex items-center gap-10" >
                                        <LessonNode
                                            key={item.lessonId}
                                            {...item}
                                            setChildReady={setChildReady}
                                        />
                                    </div>
                                )
                            })
                        }
                    </Xwrapper >
                </div >
            </motion.main >
        </>
    )
}

export default LessonMap;