import React from "react"
import { observer } from "mobx-react"
import { useState, useEffect } from "react";

import { useTendonContainer } from "linkWithBackend/services/container";
import NodeDataViewModel from "./NodeViewModel";
import TYPES, { MemType, Node } from "linkWithBackend/interfaces/TendonType";
import { useRouter } from "next/router";
import container from "linkWithBackend/services/inversify.config";
import MemoryService from "linkWithBackend/services/memory_service";
import { resSource } from "types/index";

interface propsInterface {
    body: Node
}
const memService = container.get<MemoryService>(TYPES.MemoryService)
var token = memService.getLocalStorage(MemType.token)

export const NodeCreateHandle = observer((props: propsInterface) => {
    const router = useRouter()
    const body = props.body
    const [nodeView, setNodeView] = useState<Node>({} as Node)
    const [message, setMessage] = useState<String>("")
    const [status, setStatus] = useState<Number>(0)
    const viewModel = new NodeDataViewModel(useTendonContainer())

    new Promise(function (myResolve, myReject) {
        useEffect(() => {
            var mytoken = memService.getLocalStorage(MemType.token)
            const tmpValue = viewModel.createNode(body, mytoken)
            myResolve(tmpValue)
        }, [])
    }).then(() => {
        setNodeView(viewModel.getNode())
        setMessage(viewModel.getMessage())
        setStatus(viewModel.getStatus())
    })

    if (status === 201) {
        return (
            <div>
                <p> [ Node POST ] </p>
                <NodeView viewModel={nodeView} />
            </div>
        )
    } else {
        if (message === "") {
            return (
                <div> Loading... </div>
            )
        }
        if (status === 409) {
            router.push("/login")
            return (
                <div> Expired Time YOU MUST LOGIN! </div>
            )
        }
        return (
            <div>
                <p> NODE POST ERROR ZONE: </p>
                <p> {message} </p>
            </div>
        )
    }
})

interface getNodeInterface {
    node_id: string
    setIsOpened: (value: boolean) => void
    setResSource: (value: resSource) => void
}

export const NodeGetHandle = observer((props: getNodeInterface) => {
    const node_id = props.node_id
    const [nodeView, setNodeView] = useState<Node>({} as Node)
    const [message, setMessage] = useState<String>("")
    const viewModel = new NodeDataViewModel(useTendonContainer())
    new Promise(function (myResolve, myReject) {
        useEffect(() => {
            const tmpValue = viewModel.getNodeData(node_id, token)
            myResolve(tmpValue)
        }, [])
    }).then(() => {
        setNodeView(viewModel.getNode())
        setMessage(viewModel.getMessage())
    })

    if (nodeView.ID === undefined) {
        if (message === "") {
            return (
                <div> Loading... </div>
            )
        }
        return (
            <div>
                <p>  NODE GET ERROR ZONE: </p>
                <p> {message} </p>
            </div>
        )
    }

    // attributes: {
    //     priority: "require" | "extension" | "optional";
    //     size: number;
    //     /** @example "/resources/pdf/1234" */
    //     resources: string;
    //   };

    return (
        <>
            {/* <NodeItem
                key={nodeView.id}
                type={nodeView.type}
                name={nodeView.data}
                id={nodeView.id}
                setIsOpened={props.setIsOpened}
                setResSource={props.setResSource}
                attributes={
                    { priority: "require", size: 9, resources: "www.google.com" }
                }
            /> */}
        </>
    )
})

export const NodeUpdateHandle = observer((props: propsInterface) => {
    const node_id = props.body.ID!
    const body = props.body
    const [nodeView, setNodeView] = useState<Node>({} as Node)
    const [message, setMessage] = useState<String>("")
    const viewModel = new NodeDataViewModel(useTendonContainer())
    new Promise(function (myResolve, myReject) {
        useEffect(() => {
            const tmpValue = viewModel.updateNodeData(node_id, token, body)
            myResolve(tmpValue)
        }, [])
    }).then(() => {
        setNodeView(viewModel.getNode())
        setMessage(viewModel.getMessage())
    })

    if (nodeView.ID === undefined) {
        if (message === "") {
            return (
                <div> Loading... </div>
            )
        }
        return (
            <div>
                <p> NODE UPDATE ERROR ZONE: </p>
                <p> {message} </p>
            </div>
        )
    }

    return (
        <div>
            <p> [ Node UPDATE ] </p>
            <NodeView viewModel={nodeView} />
        </div>
    )
})

export const NodeDeleteHandle = observer((props: propsInterface) => {
    const node_id = props.body.ID!
    const [deleteStatus, setDeleteStatus] = useState<Number>(0)
    const [message, setMessage] = useState<String>("")
    const viewModel = new NodeDataViewModel(useTendonContainer())

    new Promise(function (myResolve, myReject) {
        useEffect(() => {
            const tmpValue = viewModel.deleteNode(node_id, token)
            myResolve(tmpValue)
        }, [])
    }).then(() => {
        setDeleteStatus(viewModel.getStatus())
        setMessage(viewModel.getMessage())
    })

    if (deleteStatus === 200) {
        return (
            <div>
                <p> [ Node DELETE ] </p>
                <p> Delete Complete </p>
            </div>
        )
    } else {
        if (message === "") {
            return (
                <div> Loading... </div>
            )
        }
        return (
            <div>
                <p> NODE DELETE ERROR ZONE: </p>
                <p> {message} </p>
            </div>
        )
    }
})

interface ShowDataViewProps {
    viewModel: Node
}

const NodeView = observer(({ viewModel }: ShowDataViewProps) => {
    return (
        <div>
            <div key={viewModel.ID}>
                <p> **** {viewModel.ID} **** </p>
                <li> {viewModel.FileType} </li>
                <li> {viewModel.Data} </li>
                <li> {viewModel.UpdateAt} </li>
                <hr></hr>
            </div>
        </div>
    )
})