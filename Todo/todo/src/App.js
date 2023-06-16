
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import TodoContainer from './components/todos/TodoContainer'
import styles from './App.module.css'


function App() {
  return (
    <div className={styles.wrapper}>
        {/* Header*/}
        <Header />
        {/*Todo Container */}
        <TodoContainer />
        {/*Create todo */} 
        {/*List todo */}
          {/*Todo list item - display, delete , edit */}
        {/* Footer */} 
        <Footer />
    </div>
  );
}


export default App
