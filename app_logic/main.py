# to run the code: streamlit run main.py

import langchain_helper as lch
import vector_helper as vh
import streamlit as st
# from st_copy_to_clipboard import st_copy_to_clipboard


# gen_quiz(role, topics, context, test_type, num_questions, difficulty, format, request)
st.set_page_config(page_title="QuizChain", layout="wide")
st.title("QuizChain Generator")

# Role input (selectbox)
st.sidebar.header("Quiz Settings")

user_role = st.sidebar.selectbox("Select your role:", [
                                                        "Teacher", 
                                                        "Tutor", 
                                                        "Professor", 
                                                        "Expert"])

user_topic = st.sidebar.text_input("Enter the topic:")

# Context input (textarea and file insert)
user_context = st.sidebar.text_area("Enter the context:")

# File input
if "uploader_key" not in st.session_state:
    st.session_state.uploader_key = 0

if st.sidebar.button("Clear uploaded file"):
    st.session_state.uploader_key += 1
    st.rerun()

user_file = st.sidebar.file_uploader("Or upload a file for context:",
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
                                      type=["txt", "pdf", "docx","md", "pptx", "csv", "xlsx", "png", "jpg", "jpeg"],
                                      accept_multiple_files=True,
                                      key=f"uploader_{st.session_state.uploader_key}")

all_extracted_text = ""

if user_file:
    for file in user_file:
        file_text = lch.get_file_text(file)
        all_extracted_text += file_text + "\n\n"

    char_count = len(all_extracted_text)
    
    if char_count > 30000:
        st.sidebar.warning(f"File too large ({char_count} characters). Please upload a smaller file.")
    else:
        st.sidebar.success(f"File uploaded successfully! ({char_count} characters extracted)")
    
    chunks = lch.chunk_text(all_extracted_text, chunk_size=1024, chunk_overlap=200)
    st.sidebar.info(f"Text has been chunked into {len(chunks)} parts for processing.")

user_k = st.sidebar.number_input("Number of relevant context chunks to use (k):", min_value=1, max_value=100, value=5, step=1)


user_test_types = st.sidebar.multiselect("Select test types:", [
                                                                "Multiple Choice", 
                                                                "Cases and Situations",  
                                                                "True/False", 
                                                                "Short Answer", 
                                                                "Fill in the Blanks", 
                                                                "Matching", 
                                                                "Practical Exercises", 
                                                                "Essay Questions", 
                                                                "Case Studies", 
                                                                "Problem Solving", 
                                                                "Code Exercise",
                                                                "Code Problem",
                                                                "Edge Cases and questions"])
user_num_questions = st.sidebar.number_input("Number of questions:", min_value=1, max_value=100, value=10, step=1)
user_difficulty = st.sidebar.selectbox("Select difficulty level:", ["Easy", "Medium", "Hard"])

user_format = st.sidebar.text_area("Enter the format:")

user_request = st.sidebar.text_area("Enter any additional instructions or conversation flow:")



# Choose what model to use
model_choice = st.sidebar.selectbox("Select the AI model:", ["Ollama", "Gemini"])

# Generate Quiz button
if st.sidebar.button("Generate Quiz"):
    if not user_topic and not user_context:
        st.error("Please provide a topic, context or file to generate a quiz.")
    else:
        with st.spinner(f"Running {model_choice}... Please wait."):
            try:
                if model_choice == "Ollama":
                    quiz = lch.gen_quiz_local(
                        user_role, 
                        user_topic, 
                        user_context,
                        all_extracted_text,
                        user_test_types,
                        user_num_questions,
                        user_difficulty,
                        user_format,
                        user_request,
                        user_k
                    )

                elif model_choice == "Gemini":
                    quiz, generated_prompt = lch.gen_quiz(
                        user_role, 
                        user_topic, 
                        user_context,
                        all_extracted_text,
                        user_test_types,
                        user_num_questions,
                        user_difficulty,
                        user_format,
                        user_request,
                        user_k
                    )

                st.success("Done!")
                st.subheader("Generated Quiz:")
                st.write(quiz)

                st.subheader("Debugger")

                with st.expander("View Full Prompt"):
                    st.text("The exact string sent to the LLM:")
                    st.code(generated_prompt, language="markdown")
                with st.expander("View Quiz in MD Format"):
                    st.text("You can copy the quiz in markdown format below:")
                    st.code(quiz, language="markdown")


            except Exception as e:
                st.error(f"An error occurred: {e}")

st.info("Tip: If using Ollama, ensure the local server is running.")
