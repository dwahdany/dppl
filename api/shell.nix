{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    # Python
    python312
    uv
    
    # Rust
    rustc
    cargo
    
    # Build dependencies
    pkg-config
    openssl
  ];

  shellHook = ''
    # Create and activate virtual environment if it doesn't exist
    uv venv 
    source .venv/bin/activate
    
    # Install Python dependencies if not already installed
    if [ ! -d ".venv/lib/python3.11/site-packages/fastapi" ]; then
      uv pip install -r requirements.txt
    fi

    # Print Python version for verification
    python --version
  '';
} 