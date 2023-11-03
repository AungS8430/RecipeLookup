"use client";
import { Button, ButtonGroup } from "@nextui-org/button";
import { useEffect, useState } from "react";

export const RecipeButtons = ({ params }: { params: { id: string } }) => {
    const [copyButtonText, setCopyButtonText] = useState("Share");
    const { id } = params;
    function copyLink() {
        navigator.clipboard.writeText(window.location.href);
        setCopyButtonText("Copied!");
        setTimeout(() => {
            setCopyButtonText("Share");
        }, 5000);
    }
    const [planned, setPlanned] = useState<string[]>([]);
    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            let planned = JSON.parse(localStorage.getItem("planned") || "[]");
            setPlanned(planned);
        }
    }, [])
    const [addToPlannerButtonText, setAddToPlannerButtonText] = useState("Add to planner");
    function handleAddToPlanner() {
        let planned = JSON.parse(localStorage.getItem("planned") || "[]");
        planned.push(id);
        localStorage.setItem("planned", JSON.stringify(planned));
        setPlanned(planned);
        setAddToPlannerButtonText("Added!");
        setTimeout(() => {
            setAddToPlannerButtonText("Add to planner");
        }, 5000);
    }
    const [saved, setSaved] = useState<boolean>(false);
    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            let saved = JSON.parse(localStorage.getItem("saved") || "[]").includes(id);
            setSaved(saved);
        }
    }, [id])
    function handleSave() {
        let saved = JSON.parse(localStorage.getItem("saved") || "[]");
        if (saved.includes(id)) {
            const index = saved.indexOf(id);
            if (index !== -1) {
                saved.splice(index, 1);
            }
            localStorage.setItem("saved", JSON.stringify(saved));
            setSaved(false);
        } else {
            saved.push(id);
            localStorage.setItem("saved", JSON.stringify(saved));
            setSaved(true);
        }
    }
    return (
        <div>
            <div className="hidden sm:flex flex-row gap-2">
                <ButtonGroup>
                    <Button color="success" onPress={handleAddToPlanner}>{addToPlannerButtonText}</Button>
                    <Button color="primary" onPress={copyLink}>{copyButtonText}</Button>
                    <Button onPress={handleSave}>{saved ? "Unsave" : "Save"}</Button>
                </ButtonGroup>
            </div>
            <div className="flex sm:hidden flex-row gap-2">
                <ButtonGroup>
                    <Button color="success" onPress={handleAddToPlanner} size="sm">{addToPlannerButtonText}</Button>
                    <Button color="primary" onPress={copyLink} size="sm">{copyButtonText}</Button>
                    <Button size="sm">Save</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}