const fs = require('fs');
const path = require('path');

const filePath = path.join('src', 'components', 'novario', 'OViiChat.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const mapStart = '{chatMsgs.map((m, i) => {';
const mapEnd = '})}';
const startIdx = content.indexOf(mapStart);
const endIdx = content.indexOf(mapEnd, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    const finalEndIdx = endIdx + 3;
    const newMap = `{chatMsgs.map((m, i) => {
                      const mine = m.uid === uid;
                      const prevMsg = chatMsgs[i - 1];
                      const isConsecutive = prevMsg && prevMsg.uid === m.uid;
                      const nextMsg = chatMsgs[i + 1];
                      const isLastInGroup = !nextMsg || nextMsg.uid !== m.uid;

                      return (
                        <div key={m.id} className={\`w-full flex \${mine ? "justify-end" : "justify-start"} \${!isConsecutive ? "mt-4" : "mt-0"}\`}>
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={\`flex items-end gap-2 max-w-[85%] \${mine ? "flex-row-reverse" : "flex-row"}\`}
                          >
                            <div className="w-8 shrink-0 flex justify-center">
                              {isLastInGroup && <img src={m.avatar} className="h-8 w-8 rounded-full object-cover shadow-md border border-white/5" alt="" />}
                            </div>

                            <div className={\`flex-1 min-w-0 flex flex-col \${mine ? "items-end" : "items-start"}\`}>
                              {!mine && !isConsecutive && m.name && (
                                <span className="text-[12px] font-bold text-white/40 ml-2 mb-1 uppercase tracking-wider">{m.name}</span>
                              )}

                              {m.type === "voice" ? (
                                <AudioPlayer src={m.content} id={m.id} mine={mine} status={m.status} createdAt={m.createdAt} isDarkMode={isDarkMode} />
                              ) : (
                                <div className={\`relative px-[12px] py-[8px] shadow-md w-fit max-w-full \${
                                  mine 
                                    ? "bg-[#005c4b] text-white rounded-[18px] rounded-br-[4px]"
                                    : "bg-[#202c33] text-white rounded-[18px] rounded-bl-[4px]"
                                }\`}>
                                  {m.type === "image" ? (
                                    <div className="flex flex-col gap-2">
                                      <div className="rounded-[12px] overflow-hidden cursor-pointer" onClick={() => setSelectedImage(m.content)}>
                                        <img src={m.content} alt="" className="max-w-full h-auto object-cover max-h-[300px]" />
                                      </div>
                                      {m.caption && <p className="text-[16px] leading-[1.45]">{m.caption}</p>}
                                    </div>
                                  ) : (
                                    <p className="text-[16px] leading-[1.45] break-words whitespace-pre-wrap">{m.content}</p>
                                  )}
                                  
                                  <div className="flex items-center justify-end gap-1 opacity-50 mt-1">
                                    <span className="text-[10px] font-medium uppercase tracking-tighter">
                                      {m.createdAt?.toDate()?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </span>
                                    {mine && <MsgTick status={m.status} />}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}`;
    content = content.substring(0, startIdx) + newMap + content.substring(finalEndIdx);
}

fs.writeFileSync(filePath, content);
console.log('Fixed mapping syntax');
