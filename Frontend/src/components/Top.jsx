import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  UploadCloud, 
  X, 
  CheckCircle, 
  Image as ImageIcon,
  FileText,
  Type,
  Info,
} from "lucide-react";

export default function Top({ 
  title, 
  setTitle, 
  description, 
  setDescription, 
  handleImageUpload, 
  image 
}) {
  const [dragActive, setDragActive] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload({ target: { files: [e.dataTransfer.files[0]] } });
    }
  };

  return (
    <div className="space-y-8">

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Type className="w-4 h-4 text-blue-600" />
          </div>
            <label className="text-lg font-semibold text-gray-800">Issue Title</label>
        </div>
          {title.length > 0 && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <CheckCircle className="w-3 h-3 mr-1" />
              Title Added
            </Badge>
              )}
        </div>
        <div className="relative">
          <Input 
            type="text" 
            placeholder="Enter a clear and descriptive title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setFocusedField('title')}
            onBlur={() => setFocusedField(null)}
            className={`p-4 text-lg bg-white/50 backdrop-blur-sm border-2 transition-all duration-200 ${
              focusedField === 'title' 
                ? 'border-blue-400 ring-2 ring-blue-100' 
                : 'border-gray-200'
            }`}
          />
        </div>
      </motion.div>

      {/* Description Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <FileText className="w-4 h-4 text-purple-600" />
            </div>
            <label className="text-lg font-semibold text-gray-800">Description</label>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Info className="w-4 h-4" />
            <span>Be specific and include relevant details</span>
          </div>
        </div>
        <Textarea 
          placeholder="Provide detailed information about the issue..." 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          onFocus={() => setFocusedField('description')}
          onBlur={() => setFocusedField(null)}
          className={`p-4 min-h-[150px] text-base bg-white/50 backdrop-blur-sm border-2 transition-all duration-200 ${
            focusedField === 'description' 
              ? 'border-purple-400 ring-2 ring-purple-100' 
              : 'border-gray-200'
          }`}
        />
      </motion.div>

      {/* Image Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <ImageIcon className="w-4 h-4 text-green-600" />
            </div>
            <label className="text-lg font-semibold text-gray-800">Evidence Images</label>
          </div>
          {image && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <CheckCircle className="w-3 h-3 mr-1" />
              Image Added
            </Badge>
          )}
        </div>
        <div 
          className={`relative border-2 border-dashed rounded-xl transition-all duration-300 ${
            dragActive 
              ? 'border-blue-500 bg-blue-50 scale-[1.02]' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="image-upload"
            onChange={handleImageUpload}
          />
          <label 
            htmlFor="image-upload"
            className="flex flex-col items-center cursor-pointer p-8"
          >
            <AnimatePresence mode="wait">
              {image ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative w-full"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setImage(null);
                    }}
                    className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <UploadCloud className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-lg font-medium text-gray-700">
                    Drop your images here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Supports: JPG, PNG, GIF (Max 5MB)
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </label>
        </div>
      </motion.div>
    </div>
  );
}
