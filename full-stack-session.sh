#!/bin/sh

working_dir=.
server_dir=nodeservers/wapp

cd $working_dir

session='wap'
tmux new-session -d -s $session

# Create Server window
tmux rename-window -t 0 'Main'
tmux send-keys -t 'Main' 'clear' C-m

tmux new-window -t $session:1 -n 'Server'
tmux send-keys -t 'Server' 'cd server' C-m 'yarn watch' C-m
tmux select-window -t $session:1
tmux split-window -h 'cd server && yarn dev'

tmux new-window -t $session:2 -n 'Client'
tmux send-keys -t 'Client' 'cd client && expo start' C-m

# tmux new-window -t $session:3 -n 'Cktel'
# tmux send-keys -t 'Cktel' 'ssh chrlz@cktel' C-m "cd $server_dir && yarn dev" C-m

tmux attach-session -t $session:0
