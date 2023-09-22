import { useChatContext } from "@/context/Chat";
import { Button } from "@mui/material";
import React from "react";
const EmptyChatSuggestion = (): JSX.Element => {
    const {updateBrainstormContentList} = useChatContext();
    const selectGenreHandle = () => {
        updateBrainstormContentList({content : "Help me brainstorm a story based on the following genres", suggestionList: ["Romantic", "Comedy", "Tragedy"], role: 'suggestion'});
    }
    const suggestMainCharacters = () => {
        updateBrainstormContentList({content : "Suggest a main character for a story which is:", suggestionList: ["Hero", "Villain", "Man", "Women"], role: 'suggestion'});
    }
    return (
        <div className="flex flex-col items-center pt-12 h-full">
            <p>Welcome to Novella.</p>
            <p>Lets start your books with.</p>
            <div className="grid grid-rows-2 grid-cols-2 bg-neural-100 gap-4 pt-8">
                <Button className="bg-gray-300 p-4 rounded-xl hover:bg-gray-700 hover:text-white text-black" onClick={selectGenreHandle}>Select your genres</Button>
                <Button className="bg-gray-300 p-4 rounded-xl hover:bg-gray-700 hover:text-white text-black">Suggest a random plot</Button>
                <Button className="bg-gray-300 p-4 rounded-xl hover:bg-gray-700 hover:text-white text-black">Suggest a book concept</Button>
                <Button className="bg-gray-300 p-4 rounded-xl hover:bg-gray-700 hover:text-white text-black" onClick={suggestMainCharacters}>Suggest an character</Button>
            </div>
        </div>
    )
}
export default EmptyChatSuggestion;
