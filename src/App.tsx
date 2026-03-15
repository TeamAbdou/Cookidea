import { useState } from 'react';
import { TitleBar } from './features/cookidea/components/TitleBar/TitleBar';
import { RecipeDropzone } from './features/cookidea/components/RecipeDropzone/RecipeDropzone';
import { ActionBar } from './features/cookidea/components/ActionBar/ActionBar';
import { ResultArea } from './features/cookidea/components/ResultArea/ResultArea';
import { useRecipeGeneration } from './features/cookidea/hooks/useRecipeGeneration';

function App() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { generate, isLoading, resultMarkdown, error } = useRecipeGeneration();

  const handleGenerate = (country: string) => {
    generate(selectedImage, country);
  };

  return (
    <div className="app-container">
      <div className="dashboard">
        <TitleBar />

        <div className="main-content">
          <RecipeDropzone
            onFileSelect={setSelectedImage}
            selectedFile={selectedImage}
          />

          <ActionBar
            onGenerate={handleGenerate}
            isLoading={isLoading}
            disabled={false} // Always let them generate, even without image as per requirement
          />

          <ResultArea
            markdown={resultMarkdown}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
