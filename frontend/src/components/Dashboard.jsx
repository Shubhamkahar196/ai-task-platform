// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import BASE_URL from "../utils/contants";

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [title, setTitle] = useState("");
//   const [inputText, setInputText] = useState("");
//   const [operation, setOperation] = useState("uppercase");
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     getProfile();
//     getAllTasks();
//   }, []);

//   const getProfile = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/auth/profile`, {
//         withCredentials: true,
//       });
//       setUser(res.data.user);
//     } catch (error) {
//       console.log(error)
//       navigate("/login");
//     }
//   };

//   const createTask = async () => {
//     try {
//       await axios.post(
//         `${BASE_URL}/tasks/create`,
//         { title, inputText, operation },
//         { withCredentials: true }
//       );
//       alert("Task Created Successfully");
//       await getAllTasks();
//       setTitle("");
//       setInputText("");
//       setOperation("uppercase");
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const runTask = async(id)=>{
//     try{
//         await axios.post(
//             `${BASE_URL}/tasks/${id}/run`,
//             {},
//             {withCredentials:true}
//         );

//         getAllTasks();

//     }catch(err){
//         console.log(err);
//     }
// }

// const deleteTask = async(id)=>{
//     try{

//         await axios.delete(
//             `${BASE_URL}/tasks/${id}`,
//             {
//                 withCredentials:true
//             }
//         );

//         getAllTasks();

//     }catch(err){
//         console.log(err);
//     }
// }

// useEffect(()=>{

//     getAllTasks();

//     const interval = setInterval(()=>{
//         getAllTasks();
//     },3000);

//     return ()=>clearInterval(interval);

// },[]);

//   const getAllTasks = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/tasks`, {
//         withCredentials: true,
//       });
//       console.log(res.data)
//       setTasks(res.data.response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Status badge style helper
//   const getStatusBadge = (status) => {
//     switch (status?.toLowerCase()) {
//       case "completed":
//         return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
//       case "pending":
//         return "bg-amber-500/10 text-amber-400 border-amber-500/20";
//       default:
//         return "bg-blue-500/10 text-blue-400 border-blue-500/20";
//     }
//   };

//   return (
//     <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 text-gray-100">
      
//       {/* Header Banner */}
//       <div className="mb-8 md:mb-12">
//         <h1 className="text-2xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-gray-200 to-[#A29BFE] bg-clip-text text-transparent">
//           Welcome back, {user?.name || "User"}
//         </h1>
//         <p className="text-xs sm:text-sm text-gray-400 mt-1">
//           Manage your operations and analyze AI tasks dynamically.
//         </p>
//       </div>

//       {/* Main Responsive Split Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
//         {/* Left/Top Column: Create Task Action Panel */}
//         <div className="lg:col-span-5 bg-[#131B2E] border border-gray-800 p-5 sm:p-6 rounded-2xl shadow-xl space-y-4 sticky top-24">
//           <h2 className="text-lg font-bold tracking-tight text-[#A29BFE] mb-2 flex items-center gap-2">
//             <span className="h-2 w-2 rounded-full bg-[#6C5CE7] animate-ping" />
//             Create New Task
//           </h2>

//           <div className="space-y-1">
//             <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">Task Title</label>
//             <input
//               type="text"
//               placeholder="e.g., Format JSON Output"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full rounded-xl bg-[#0B0F19] border border-gray-800 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20"
//             />
//           </div>

//           <div className="space-y-1">
//             <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">Input Text</label>
//             <textarea
//               placeholder="Paste raw string data here..."
//               value={inputText}
//               onChange={(e) => setInputText(e.target.value)}
//               rows={4}
//               className="w-full rounded-xl bg-[#0B0F19] border border-gray-800 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 resize-none"
//             />
//           </div>

//           <div className="space-y-1">
//             <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">Target Operation</label>
//             <div className="relative">
//               <select
//                 value={operation}
//                 onChange={(e) => setOperation(e.target.value)}
//                 className="w-full rounded-xl bg-[#0B0F19] border border-gray-800 px-4 py-3 text-sm text-white outline-none transition focus:border-[#6C5CE7] appearance-none cursor-pointer"
//               >
//                 <option value="uppercase">Uppercase</option>
//                 <option value="lowercase">Lowercase</option>
//                 <option value="reverse">Reverse</option>
//                 <option value="wordcount">Word Count</option>
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
//                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
//               </div>
//             </div>
//           </div>

//           <button
//             onClick={createTask}
//             className="w-full mt-2 rounded-xl bg-[#6C5CE7] hover:bg-[#5A4BCF] py-3 text-sm font-bold text-white cursor-pointer transition-all active:scale-[0.99] shadow-[0_4px_20px_rgba(108,92,231,0.25)]"
//           >
//             Process Task Execution
//           </button>
//         </div>

//         {/* Right/Bottom Column: Historic Task View Feed */}
//         <div className="lg:col-span-7 space-y-4">
//           <div className="flex items-center justify-between border-b border-gray-800 pb-3">
//             <h2 className="text-xl font-bold tracking-tight">
//               My Task Logs
//             </h2>
//             <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-800 text-gray-400">
//               {tasks.length} total
//             </span>
//           </div>

//           {tasks.length === 0 ? (
//             <div className="text-center py-16 bg-[#131B2E]/30 border border-dashed border-gray-800 rounded-2xl">
//               <p className="text-gray-500 text-sm">No tasks logged yet. Initiate an execution stack above.</p>
//             </div>
//           ) : (
//            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//   {tasks.map((task) => (
//     <div
//       key={task._id}
//       className="bg-[#131B2E] border border-gray-800 p-5 rounded-2xl shadow-md"
//     >
//       <h3 className="font-bold text-lg">{task.title}</h3>

//       <p>Operation: {task.operation}</p>

//       <p>Status: {task.status}</p>

//       <p>Result: {task.result || "No Result"}</p>

//       <div className="flex gap-3 mt-4">
//         <button
//           onClick={() => runTask(task._id)}
//           className="btn btn-primary btn-sm"
//         >
//           Run
//         </button>

//         <button
//           onClick={() => deleteTask(task._id)}
//           className="btn btn-error btn-sm"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   ))}
// </div>

//       </div>
//     </div>
//   );
// };

// export default Dashboard;





import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/contants";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [inputText, setInputText] = useState("");
  const [operation, setOperation] = useState("uppercase");
  const [tasks, setTasks] = useState([]);

  // Consolidated both useEffects into one single side-effect lifecycle mount
  useEffect(() => {
    getProfile();
    getAllTasks();

    const interval = setInterval(() => {
      getAllTasks();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/profile`, {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  const getAllTasks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/tasks`, {
        withCredentials: true,
      });
      console.log(res.data);
      setTasks(res.data.response || []); // Safeguard against empty or unexpected array formats
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async () => {
    try {
      await axios.post(
        `${BASE_URL}/tasks/create`,
        { title, inputText, operation },
        { withCredentials: true }
      );
      alert("Task Created Successfully");
      await getAllTasks();
      setTitle("");
      setInputText("");
      setOperation("uppercase");
    } catch (error) {
      console.log(error);
    }
  };

  const runTask = async (id) => {
    try {
      await axios.post(
        `${BASE_URL}/tasks/${id}/run`,
        {},
        { withCredentials: true }
      );
      getAllTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/tasks/${id}`, {
        withCredentials: true,
      });
      getAllTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // Status badge style helper
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default:
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 text-gray-100">
      
      {/* Header Banner */}
      <div className="mb-8 md:mb-12">
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-gray-200 to-[#A29BFE] bg-clip-text text-transparent">
          Welcome back, {user?.name || "User"}
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Manage your operations and analyze AI tasks dynamically.
        </p>
      </div>

      {/* Main Responsive Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left/Top Column: Create Task Action Panel */}
        <div className="lg:col-span-5 bg-[#131B2E] border border-gray-800 p-5 sm:p-6 rounded-2xl shadow-xl space-y-4 sticky top-24">
          <h2 className="text-lg font-bold tracking-tight text-[#A29BFE] mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#6C5CE7] animate-ping" />
            Create New Task
          </h2>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">Task Title</label>
            <input
              type="text"
              placeholder="e.g., Format JSON Output"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl bg-[#0B0F19] border border-gray-800 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">Input Text</label>
            <textarea
              placeholder="Paste raw string data here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={4}
              className="w-full rounded-xl bg-[#0B0F19] border border-gray-800 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">Target Operation</label>
            <div className="relative">
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                className="w-full rounded-xl bg-[#0B0F19] border border-gray-800 px-4 py-3 text-sm text-white outline-none transition focus:border-[#6C5CE7] appearance-none cursor-pointer"
              >
                <option value="uppercase">Uppercase</option>
                <option value="lowercase">Lowercase</option>
                <option value="reverse">Reverse</option>
                <option value="wordcount">Word Count</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>

          <button
            onClick={createTask}
            className="w-full mt-2 rounded-xl bg-[#6C5CE7] hover:bg-[#5A4BCF] py-3 text-sm font-bold text-white cursor-pointer transition-all active:scale-[0.99] shadow-[0_4px_20px_rgba(108,92,231,0.25)]"
          >
            Process Task Execution
          </button>
        </div>

        {/* Right/Bottom Column: Historic Task View Feed */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <h2 className="text-xl font-bold tracking-tight">
              My Task Logs
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-800 text-gray-400">
              {tasks.length} total
            </span>
          </div>

          {tasks.length === 0 ? (
            <div className="text-center py-16 bg-[#131B2E]/30 border border-dashed border-gray-800 rounded-2xl">
              <p className="text-gray-500 text-sm">No tasks logged yet. Initiate an execution stack above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Correctly wrapped inside code evaluation brackets {} */}
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-[#131B2E] border border-gray-800 p-5 rounded-2xl shadow-md flex flex-col justify-between transition-all hover:border-gray-700"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-bold text-base text-white truncate max-w-[160px]" title={task.title}>
                        {task.title || "Untitled Operation"}
                      </h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${getStatusBadge(task.status)}`}>
                        {task.status || "idle"}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase block">Operation</span>
                        <span className="text-xs font-mono text-gray-300 bg-[#0B0F19] px-2 py-0.5 rounded border border-gray-800 inline-block mt-0.5">
                          {task.operation}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase block">Result</span>
                        <p className={`text-xs mt-1 p-2 rounded-lg font-mono break-words ${
                          task.result 
                            ? "text-emerald-400 bg-emerald-950/20 border border-emerald-900/40" 
                            : "text-gray-400 bg-[#0B0F19] border border-gray-800/60 italic"
                        }`}>
                          {task.result || "No execution result recorded yet."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-800/60 mt-auto">
                    <button
                      onClick={() => runTask(task._id)}
                      className="px-3 py-1.5 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white rounded-lg text-xs font-semibold transition cursor-pointer"
                    >
                      Run
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="px-3 py-1.5 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white rounded-lg text-xs font-semibold transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

